import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, X, RotateCcw, Check, Sparkles } from 'lucide-react';

interface LogoSlotProps {
  variant: 'header' | 'footer';
  className?: string;
}

const LOGO_STORAGE_KEY = 'nane_custom_logo';

// Ícone do monograma oficial N + L da Nane Libras
export function NaneLogoSymbol({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Base estilizada do monograma N + L */}
      <g>
        {/* Perna esquerda e arco superior do N em Azul Real (#0048B5) */}
        <path
          d="M 52,142 
             C 41,142 32,133 32,122 
             L 32,56 
             C 32,32 51,13 75,13 
             C 89,13 101,20 109,31 
             L 125,53 
             C 129,59 127,67 121,71 
             C 115,75 107,73 103,67 
             L 93,53 
             C 88,46 81,42 74,42 
             C 61,42 50,53 50,66 
             L 50,122 
             C 50,133 46,142 52,142 Z"
          fill="#0048B5"
        />

        {/* Laço e haste direita do L em Azul Real (#0048B5) */}
        <path
          d="M 120,128 
             C 120,135 114,141 107,141 
             C 100,141 94,135 94,128 
             L 94,84 
             C 94,79 98,75 103,75 
             C 108,75 112,79 112,84 
             L 112,118 
             C 112,123 116,127 121,127 
             C 126,127 130,123 130,118 
             L 130,58 
             C 130,47 139,38 150,38 
             C 161,38 170,47 170,58 
             L 170,114 
             C 170,138 150,157 126,157 
             C 112,157 99,150 91,139 
             L 66,104 
             C 62,99 63,91 69,87 
             C 74,83 82,84 87,90 
             L 110,123 
             C 113,126 117,128 120,128 Z"
          fill="#0048B5"
        />

        {/* Ponto / Cabeça Laranja (#FF5700) sobre a haste direita */}
        <circle cx="150" cy="23" r="15" fill="#FF5700" />
      </g>
    </svg>
  );
}

export default function LogoSlot({ variant, className = '' }: LogoSlotProps) {
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOGO_STORAGE_KEY);
      if (saved) setCustomLogo(saved);
    } catch {
      // ignore
    }

    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(LOGO_STORAGE_KEY);
        setCustomLogo(saved);
      } catch {
        // ignore
      }
    };

    window.addEventListener('nane-logo-updated', handleUpdate);
    return () => window.removeEventListener('nane-logo-updated', handleUpdate);
  }, []);

  const saveLogo = async (dataUrl: string) => {
    try {
      localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
      setCustomLogo(dataUrl);
      window.dispatchEvent(new Event('nane-logo-updated'));

      await fetch('/api/upload-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl })
      }).catch(() => {});
    } catch (err) {
      console.error('Erro ao salvar logo:', err);
    }
  };

  const resetLogo = () => {
    try {
      localStorage.removeItem(LOGO_STORAGE_KEY);
      setCustomLogo(null);
      window.dispatchEvent(new Event('nane-logo-updated'));
    } catch (err) {
      console.error('Erro ao resetar logo:', err);
    }
  };

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

  const handleApply = async () => {
    if (preview) {
      await saveLogo(preview);
      setSuccessMsg(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setPreview(null);
        setSuccessMsg(false);
      }, 1000);
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={`group relative inline-flex items-center cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
        title="Logomarca Oficial Nane Libras (Clique para alterar o arquivo se desejar)"
      >
        {customLogo ? (
          /* Logomarca personalizada enviada pelo usuário */
          <div className="flex items-center">
            <img 
              src={customLogo} 
              alt="Nane Libras - Sua Escola de Libras" 
              className={variant === 'header' ? "h-9 sm:h-11 w-auto object-contain" : "h-10 sm:h-12 w-auto object-contain"}
            />
          </div>
        ) : (
          /* Logomarca idêntica à página de obrigado: símbolo + texto branco / neutro elegante */
          <div className="flex items-center gap-2.5 sm:gap-3 text-left">
            {/* Símbolo do Monograma N + L */}
            <div className="flex-shrink-0">
              <NaneLogoSymbol className={variant === 'header' ? "w-10 h-10 sm:w-12 sm:h-12" : "w-10 h-10 sm:w-12 sm:h-12"} />
            </div>

            {/* Tipografia Oficial Nane Libras / Sua Escola de Libras */}
            <div className="text-left">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block leading-none">
                NANE LIBRAS
              </span>
              <span className="text-[10px] tracking-widest uppercase text-neutral-300 font-semibold block mt-0.5">
                Sua Escola de Libras
              </span>
            </div>
          </div>
        )}

        {/* Dica de clique ao passar o mouse */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30 border border-white/10">
          Clique para alterar logo
        </span>
      </div>

      {/* Modal para Trocar Imagem da Logomarca */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md rounded-3xl bg-[#0A1A4F] border-2 border-[#013F99] shadow-2xl p-6 text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
                <NaneLogoSymbol className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Logomarca Nane Libras</h3>
                <p className="text-xs text-neutral-300">Sua Escola de Libras</p>
              </div>
            </div>

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                Logomarca atualizada com sucesso!
              </div>
            )}

            {/* Zona de Drop / Seleção de Arquivo */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) processFile(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#FB6601] bg-[#FB6601]/10'
                  : 'border-[#013F99] hover:border-[#FB6601]/60 bg-[#07133B]/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) processFile(file);
                }}
                className="hidden"
              />

              {preview ? (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-3 rounded-xl shadow-lg border border-white/20 mb-3 max-w-[200px]">
                    <img src={preview} alt="Prévia da logomarca" className="max-h-20 w-auto object-contain" />
                  </div>
                  <span className="text-xs font-semibold text-[#FB6601] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Arquivo selecionado!
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center py-2">
                  <Upload className="w-8 h-8 text-[#FB6601] mb-2" />
                  <p className="text-xs font-bold text-white mb-1">
                    Clique aqui ou arraste o arquivo da logomarca
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    PNG transparente, JPG ou WEBP
                  </p>
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="mt-5 flex gap-2">
              {preview ? (
                <>
                  <button
                    onClick={handleApply}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] text-white font-bold text-xs shadow-lg shadow-[#FB6601]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Aplicar Logomarca
                  </button>
                  <button
                    onClick={() => setPreview(null)}
                    className="py-2.5 px-3 rounded-xl bg-white/10 text-neutral-300 text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {customLogo && (
                    <button
                      onClick={() => {
                        resetLogo();
                        setIsModalOpen(false);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-300 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Restaurar Logo Vetorial
                    </button>
                  )}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-300 text-xs cursor-pointer"
                  >
                    Fechar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
