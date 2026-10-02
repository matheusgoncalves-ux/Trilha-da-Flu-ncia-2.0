import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, X, RotateCcw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

const STORAGE_KEY = 'nane_exact_photo';
const DEFAULT_PHOTO = '/src/assets/images/nane_portrait_main_1790298243912.jpg';

// Hook para acessar e atualizar a foto da Nane em qualquer lugar do site
export function useNanePhoto() {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    } catch {
      // fallback
    }
    return DEFAULT_PHOTO;
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setPhotoUrl(saved || DEFAULT_PHOTO);
      } catch {
        setPhotoUrl(DEFAULT_PHOTO);
      }
    };

    window.addEventListener('nane-photo-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('nane-photo-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const savePhoto = async (dataUrl: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
      setPhotoUrl(dataUrl);
      window.dispatchEvent(new Event('nane-photo-updated'));

      // Tenta enviar para o servidor para persistir em disco
      await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl })
      }).catch(() => {
        // Se falhar no servidor, localStorage já garante persistência no navegador
      });
    } catch (err) {
      console.error('Erro ao salvar foto:', err);
    }
  };

  const resetPhoto = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setPhotoUrl(DEFAULT_PHOTO);
      window.dispatchEvent(new Event('nane-photo-updated'));
    } catch (err) {
      console.error('Erro ao resetar foto:', err);
    }
  };

  return { photoUrl, savePhoto, resetPhoto };
}

interface NanePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NanePhotoModal({ isOpen, onClose }: NanePhotoModalProps) {
  const { photoUrl, savePhoto, resetPhoto } = useNanePhoto();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPreview(null);
      setSuccessMsg(false);
    }
  }, [isOpen]);

  // Suporte a colar com Ctrl+V quando a janela estiver aberta
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG ou WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApply = async () => {
    if (preview) {
      await savePhoto(preview);
      setSuccessMsg(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const handleReset = () => {
    resetPhoto();
    setPreview(null);
    setSuccessMsg(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#0A1A4F] border-2 border-[#013F99] shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow de fundo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FB6601]/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FB6601] to-[#FF8A2A] flex items-center justify-center shadow-lg shadow-[#FB6601]/30">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">
              Inserir Foto Exata da Nane
            </h3>
            <p className="text-xs text-neutral-300">
              Substitua as fotos de demonstração pelo arquivo real da Nane
            </p>
          </div>
        </div>

        {/* Mensagem de sucesso */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Foto atualizada com sucesso em todas as seções da página!
          </div>
        )}

        {/* Zona de Drop / Seleção */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#FB6601] bg-[#FB6601]/10 scale-[1.01]'
              : 'border-[#013F99] hover:border-[#FB6601]/60 bg-[#07133B]/60 hover:bg-[#07133B]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          {preview ? (
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden border-2 border-[#FB6601] shadow-xl mb-3 group">
                <img
                  src={preview}
                  alt="Prévia da foto da Nane"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] font-bold">
                  Clique para trocar
                </div>
              </div>
              <span className="text-xs font-semibold text-[#FB6601] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Nova foto carregada!
              </span>
              <span className="text-[11px] text-neutral-400 mt-1">
                Clique abaixo em "Aplicar no Site" para salvar
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-[#FB6601]" />
              </div>
              <p className="text-sm font-bold text-white mb-1">
                Clique aqui para selecionar o arquivo da foto
              </p>
              <p className="text-xs text-neutral-400 mb-2">
                ou arraste e solte o arquivo JPG/PNG aqui
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3 h-3 text-[#FB6601]" /> Dica: Você também pode colar com Ctrl+V
              </span>
            </div>
          )}
        </div>

        {/* Foto atual do site */}
        {!preview && (
          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={photoUrl}
                alt="Foto atual"
                className="w-10 h-10 rounded-xl object-cover border border-[#013F99]"
              />
              <div className="text-left">
                <span className="text-xs font-bold text-white block">Foto em uso no site</span>
                <span className="text-[10px] text-neutral-400">Exibida no Hero, Vídeo e Mentora</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Restaurar padrão"
            >
              <RotateCcw className="w-3 h-3" /> Restaurar
            </button>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          {preview ? (
            <>
              <button
                onClick={handleApply}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-[#FB6601]/25 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Aplicar Foto em Todo o Site
              </button>
              <button
                onClick={() => setPreview(null)}
                className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-neutral-300 font-medium text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
