import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, ShieldCheck, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';

// ============================================================================
// LINK OFICIAL DO GOOGLE APPS SCRIPT (PLANILHA LEADS GRUPO VIP):
// ============================================================================
const SHEET_URL =
  import.meta.env.VITE_SHEET_URL ||
  'https://script.google.com/macros/s/AKfycbwrDdXC6mWbbIhFAsWjFwkfogeJ0QUlwKUPzJ1pnFa302PEmmw4KRCna9MHtiGHM3rz/exec';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
}: LeadCaptureModalProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Máscara para WhatsApp brasileiro: (99) 99999-9999
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Por favor, informe seu nome.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Por favor, informe um WhatsApp válido com DDD.');
      return;
    }

    setIsSubmitting(true);

    // Captura a origem (UTMs dos anúncios ou URL atual)
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const source =
      [utmSource, utmMedium, utmCampaign].filter(Boolean).join(' / ') ||
      window.location.search.replace(/^\?/, '') ||
      'Direto / Orgânico';

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      source,
    };

    // Backup local opcional
    try {
      localStorage.setItem(
        'nane_libras_lead',
        JSON.stringify({ ...payload, timestamp: new Date().toISOString() })
      );
    } catch {
      // ignore
    }

    // 1. Dispara o evento Lead do Pixel da Meta
    try {
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead');
      } else if (typeof (window as any).trackMetaLead === 'function') {
        (window as any).trackMetaLead();
      }
    } catch {
      // ignore
    }

    // 2. Grava o lead na Planilha do Google (Apps Script Web App)
    if (SHEET_URL && SHEET_URL.startsWith('http')) {
      try {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Erro ao salvar lead na planilha:', err);
      }
    }

    // 3. Fecha o modal e redireciona para a página de Obrigado (/obrigado)
    setIsSubmitting(false);
    onClose();
    navigate('/obrigado');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0A1A4F] border border-[#013F99]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barrinha de luz no topo */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FB6601] to-transparent" />

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <div className="text-center space-y-2 mb-6 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FB6601]/20 border border-[#FB6601]/40 text-xs text-[#FB6601] font-semibold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>ACESSO GRATUITO AO GRUPO VIP</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Falta pouco para entrar no <span className="text-[#FB6601]">Grupo VIP</span>
          </h3>
          <p className="text-xs text-neutral-300">
            Preencha seu nome e WhatsApp abaixo para ser redirecionado diretamente para o Grupo VIP oficial.
          </p>
        </div>

        {/* Alerta de Erro */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center gap-2 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulário com 2 campos: Nome e WhatsApp */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-neutral-200 block">
              Seu Nome
            </label>
            <input
              type="text"
              placeholder="Ex: Maria da Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#FB6601] focus:outline-none text-white text-sm placeholder:text-neutral-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-neutral-200 block">
              Seu WhatsApp com DDD
            </label>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#FB6601] focus:outline-none text-white text-sm placeholder:text-neutral-500 transition-colors"
              required
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#FB6601]/30 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-70"
          >
            <span>{isSubmitting ? 'Entrando no Grupo VIP...' : 'ENTRAR NO GRUPO VIP AGORA'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Aviso de Privacidade */}
          <div className="text-center space-y-2 pt-2">
            <p className="text-[11px] text-neutral-400 leading-tight">
              Grupo só de avisos, sem spam. Você sai quando quiser.
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
              <Lock className="w-3 h-3 text-[#FB6601]" />
              <span>Seus dados estão protegidos. Leia nossa</span>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="underline text-neutral-300 hover:text-white cursor-pointer"
              >
                Política de Privacidade
              </button>
            </div>
          </div>
        </form>

        {/* Modal de Política de Privacidade */}
        {showPrivacyModal && (
          <div className="absolute inset-0 bg-[#0A1A4F] p-6 z-20 overflow-y-auto text-left rounded-3xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FB6601]" />
                  Política de Privacidade & LGPD
                </h4>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded-md text-white"
                >
                  Voltar
                </button>
              </div>
              <div className="text-xs text-neutral-300 space-y-2 leading-relaxed max-h-[320px] overflow-y-auto pr-1">
                <p>
                  <strong>Nane Libras & Trilha da Fluência 2.0:</strong> Coletamos seu nome e WhatsApp exclusivamente para enviar comunicações sobre a Black Antecipada da Trilha da Fluência 2.0 e liberar o acesso ao Grupo VIP no WhatsApp.
                </p>
                <p>
                  Não compartilhamos, vendemos ou transferimos seus dados para terceiros. Você pode solicitar o descadastramento ou exclusão dos seus dados a qualquer momento enviando uma mensagem.
                </p>
                <p>
                  Seus dados são tratados com base no seu consentimento expresso de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPrivacyModal(false)}
              className="mt-4 w-full py-2.5 rounded-full bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white text-xs font-bold cursor-pointer"
            >
              Entendi e concordo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
