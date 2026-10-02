import React, { useState, useRef } from 'react';
import { Camera, Upload, X, RotateCcw, Check } from 'lucide-react';

interface PhotoSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  currentPhoto: string;
  defaultPhoto: string;
  onSavePhoto: (newUrl: string) => void;
  onResetPhoto: () => void;
}

export default function PhotoSlotModal({
  isOpen,
  onClose,
  title,
  subtitle,
  currentPhoto,
  defaultPhoto,
  onSavePhoto,
  onResetPhoto,
}: PhotoSlotModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem válido (JPG, PNG ou WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 8MB.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreview(urlInput.trim());
    setUrlInput('');
  };

  const handleSave = () => {
    if (preview) {
      onSavePhoto(preview);
    }
    setPreview(null);
    onClose();
  };

  const handleReset = () => {
    onResetPhoto();
    setPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0A1A4F] border border-[#013F99]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FB6601] to-transparent" />

        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FB6601]/20 border border-[#FB6601]/40 text-xs text-[#FB6601] font-bold">
            <Camera className="w-3.5 h-3.5" />
            <span>PERSONALIZAR FOTO</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-neutral-300">{subtitle}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Preview Atual / Novo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-2 border-[#FB6601] shadow-xl bg-black/40">
            <img
              src={preview || currentPhoto}
              alt={title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {preview && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#FB6601] text-white text-[10px] font-bold">
                Nova foto
              </span>
            )}
          </div>
        </div>

        {/* Opção 1: Enviar do Computador/Celular */}
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FB6601]/30 transition-all hover:scale-[1.01]"
          >
            <Upload className="w-4 h-4" />
            <span>Escolher arquivo do computador ou celular</span>
          </button>

          {/* Opção 2: Colar URL */}
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Ou cole o link direto da imagem aqui..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#FB6601] focus:outline-none text-white text-xs placeholder:text-neutral-500"
            />
            <button
              onClick={handleApplyUrl}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Carregar
            </button>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar padrão</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            {preview && (
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#FB6601]/30 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Salvar foto</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
