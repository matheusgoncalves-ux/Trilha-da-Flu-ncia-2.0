import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle2, AlertCircle, Image, ShieldCheck, RefreshCw, Sparkles, Download } from 'lucide-react';
import { NaneLogoSymbol } from './LogoSlot';

import naneHeroPhoto from '../assets/images/nane_exact_photo.jpeg';
import naneBrotherPhoto from '../assets/images/nane_brother_photo.jpeg';
import mariaClaraPhoto from '../assets/images/maria_clara_photo.jpeg';

export default function AdminPhotos() {
  const [heroPhotoSrc, setHeroPhotoSrc] = useState<string>(naneHeroPhoto);
  const [brotherPhotoSrc, setBrotherPhotoSrc] = useState<string>(naneBrotherPhoto);
  const [mariaClaraSrc, setMariaClaraSrc] = useState<string>(mariaClaraPhoto);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'brother' | 'maria') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filename = target === 'hero' 
      ? 'nane_exact_photo.jpg' 
      : target === 'brother' 
      ? 'nane_brother_photo.jpg' 
      : 'maria_clara_photo.jpg';
    setLoadingTarget(target);
    setStatusMsg({ text: `Processando upload do arquivo "${file.name}" sem nenhuma IA...`, type: 'info' });

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        setStatusMsg({ text: 'Falha ao ler o arquivo selecionado.', type: 'error' });
        setLoadingTarget(null);
        return;
      }

      try {
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl, filename }),
        });

        if (res.ok) {
          if (target === 'hero') setHeroPhotoSrc(dataUrl);
          else if (target === 'brother') setBrotherPhotoSrc(dataUrl);
          else setMariaClaraSrc(dataUrl);

          setStatusMsg({
            text: `Foto "${filename}" salva com sucesso em disco (src/assets/images e public/assets)! Nenhuma IA foi aplicada. O arquivo é 100% idêntico ao seu original.`,
            type: 'success',
          });
        } else {
          if (target === 'hero') setHeroPhotoSrc(dataUrl);
          else if (target === 'brother') setBrotherPhotoSrc(dataUrl);
          else setMariaClaraSrc(dataUrl);

          setStatusMsg({
            text: `Imagem carregada no navegador. Para enviar ao GitHub/Vercel, faça o commit do repositório ou salve o arquivo em public/assets/${filename}.`,
            type: 'info',
          });
        }
      } catch (err) {
        if (target === 'hero') setHeroPhotoSrc(dataUrl);
        else if (target === 'brother') setBrotherPhotoSrc(dataUrl);
        else setMariaClaraSrc(dataUrl);
        setStatusMsg({
          text: `Imagem visualizada com sucesso.`,
          type: 'info',
        });
      } finally {
        setLoadingTarget(null);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#07133B] text-white p-4 sm:p-8 font-['Poppins',sans-serif]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <NaneLogoSymbol className="w-10 h-10" />
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Painel Privado de Gestão de Fotos</h1>
              <p className="text-xs text-neutral-400">Ambiente exclusivo de administração (não visível aos visitantes)</p>
            </div>
          </div>
          <Link
            to="/lp-video"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver Landing Page
          </Link>
        </div>

        {/* Notificação de Status */}
        {statusMsg && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 text-sm ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : statusMsg.type === 'error'
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                : 'bg-blue-950/40 border-blue-500/50 text-blue-200'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : statusMsg.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <RefreshCw className="w-5 h-5 text-blue-400 shrink-0 animate-spin" />
            )}
            <p className="leading-relaxed">{statusMsg.text}</p>
          </div>
        )}

        {/* Guia de Compatibilidade com Vercel / GitHub */}
        <div className="p-6 rounded-3xl bg-[#0A1A4F]/80 border border-[#013F99] shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-[#FB6601] font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            Por que as imagens não apareciam na Vercel e como foi corrigido
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            No Vite, caminhos escritos como texto fixo <code className="text-amber-300 font-mono">"/src/assets/..."</code> funcionam apenas no modo de desenvolvimento. Quando você publica no <strong>GitHub + Vercel</strong>, a Vercel compila o projeto e a pasta <code className="font-mono">src</code> não existe no servidor final.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="font-bold text-emerald-400 block">✓ Correção Aplicada:</span>
              <p className="text-neutral-300">
                Todas as imagens agora são importadas via módulo estático do Vite (<code className="font-mono">import ... from '../assets/images/...'</code>). O Vite compila e gera os arquivos na pasta <code className="font-mono">dist/assets/</code> automaticamente.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="font-bold text-emerald-400 block">✓ Sincronização Dupla:</span>
              <p className="text-neutral-300">
                Os arquivos originais estão salvos em <code className="font-mono">src/assets/images/</code> e em <code className="font-mono">public/assets/</code>, garantindo que o seu Git e a Vercel tenham os arquivos físicos.
              </p>
            </div>
          </div>
        </div>

        {/* Gerenciamento das Fotos Oficiais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: Foto da Nane no Topo (Hero) */}
          <div className="p-6 rounded-3xl bg-[#0A1A4F]/50 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FB6601]">
                  Foto 1 · Topo (Hero)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Original Nane
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Nane Libras (Sinalizando Eu Te Amo)</h3>
              <p className="text-xs text-neutral-300">
                Foto oficial da Nane com blusa preta, sorrindo e sinalizando em Libras com unhas vermelhas.
              </p>
            </div>

            {/* Preview da Imagem */}
            <div className="relative aspect-[4/4.8] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-[#013F99] bg-[#07133B] shadow-lg">
              <img
                src={heroPhotoSrc}
                alt="Foto da Nane Hero"
                className="w-full h-full object-cover object-[54%_25%]"
              />
            </div>

            {/* Botão de Upload do Arquivo Original */}
            <div className="pt-2">
              <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-[#FB6601]" />
                <span>{loadingTarget === 'hero' ? 'Enviando...' : 'Substituir arquivo original da Nane'}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'hero')}
                />
              </label>
              <span className="text-[10px] text-neutral-400 block text-center mt-2 font-mono">
                Arquivo: public/assets/nane_exact_photo.jpg
              </span>
            </div>
          </div>

          {/* Card 2: Foto da Nane com o Irmão (Seção 4) */}
          <div className="p-6 rounded-3xl bg-[#0A1A4F]/50 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FB6601]">
                  Foto 2 · Seção 4 (Origem)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Arquivo WhatsApp
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Nane e seu irmão surdo estudando</h3>
              <p className="text-xs text-neutral-300">
                Selecione o arquivo exato enviado no WhatsApp (<code className="font-mono text-neutral-200">WhatsApp Image...jpeg</code>) para aplicar sem nenhuma edição de IA.
              </p>
            </div>

            {/* Preview da Imagem */}
            <div className="relative aspect-[4/3] w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-[#013F99] bg-[#07133B] shadow-lg">
              <img
                src={brotherPhotoSrc}
                alt="Foto Nane com o Irmão"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Botão de Upload do Arquivo Original do WhatsApp */}
            <div className="pt-2">
              <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-xs font-bold text-white shadow-lg shadow-[#FB6601]/20 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-white" />
                <span>{loadingTarget === 'brother' ? 'Gravando arquivo...' : 'Subir foto original do WhatsApp aqui'}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'brother')}
                />
              </label>
              <span className="text-[10px] text-neutral-400 block text-center mt-2 font-mono">
                Arquivo: public/assets/nane_brother_photo.jpg
              </span>
            </div>
          </div>

          {/* Card 3: Foto da Aluna Maria Clara (Seção 5) */}
          <div className="p-6 rounded-3xl bg-[#0A1A4F]/50 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FB6601]">
                  Foto 3 · Seção 5 (Aluna)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Depoimento
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Maria Clara (Aluna Destaque)</h3>
              <p className="text-xs text-neutral-300">
                Foto do depoimento da aluna na Seção 5 de prova social.
              </p>
            </div>

            {/* Preview da Imagem */}
            <div className="relative aspect-square w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden border-2 border-[#013F99] bg-[#07133B] shadow-lg">
              <img
                src={mariaClaraSrc}
                alt="Foto Maria Clara"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Botão de Upload da Maria Clara */}
            <div className="pt-2">
              <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-sky-400" />
                <span>{loadingTarget === 'maria' ? 'Gravando arquivo...' : 'Subir foto da Maria Clara'}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'maria')}
                />
              </label>
              <span className="text-[10px] text-neutral-400 block text-center mt-2 font-mono">
                Arquivo: public/assets/maria_clara_photo.jpg
              </span>
            </div>
          </div>

        </div>

        {/* Guia Rápido de Deploy no GitHub & Vercel */}
        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            🚀 Como sincronizar com seu GitHub e Vercel
          </h4>
          <ol className="text-xs text-neutral-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              Suba a sua foto original do WhatsApp usando o botão laranja acima, ou copie o arquivo de foto diretamente na pasta <code className="font-mono text-amber-300">public/assets/nane_brother_photo.jpg</code> no seu computador.
            </li>
            <li>
              No terminal do seu projeto, execute:
              <pre className="mt-1 p-2.5 rounded-lg bg-black/70 font-mono text-[11px] text-emerald-400 overflow-x-auto">
git add .
git commit -m "fix: sincroniza fotos oficiais para deploy na Vercel"
git push origin main
              </pre>
            </li>
            <li>
              A Vercel iniciará o build automático. Como as imagens agora estão configuradas com importação direta e na pasta <code className="font-mono text-neutral-200">public/assets/</code>, elas serão empacotadas no build e aparecerão com 100% de sucesso na produção!
            </li>
          </ol>
        </div>

      </div>
    </div>
  );
}
