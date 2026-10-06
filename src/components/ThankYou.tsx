import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { NaneLogoSymbol } from './LogoSlot';

export default function ThankYou() {
  const whatsappUrl = 'https://chat.whatsapp.com/DGbR8JFgwMb9ISttBSEW6c';

  // Nota: O evento 'Lead' do Pixel da Meta agora é disparado diretamente no envio do formulário
  // (LeadCaptureModal.tsx) para não contar em dobro caso esta página seja acessada.

  return (
    <div className="min-h-screen bg-[#0A1A4F] text-white flex flex-col justify-center items-center px-4 sm:px-6 py-10 font-['Poppins',sans-serif] selection:bg-[#FB6601] selection:text-white relative overflow-hidden">
      {/* Grafismos de luz suaves ao fundo */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#013F99]/60 to-transparent blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#FB6601]/20 via-[#013F99]/40 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-xl w-full mx-auto text-center space-y-6">
        {/* Identidade visual Nane Libras centralizada (sem menu) */}
        <div className="flex items-center justify-center gap-3">
          <NaneLogoSymbol className="w-10 h-10 sm:w-12 sm:h-12" />
          <div className="text-left">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block leading-none">
              NANE LIBRAS
            </span>
            <span className="text-[10px] tracking-widest uppercase text-neutral-300 font-semibold block mt-0.5">
              Sua Escola de Libras
            </span>
          </div>
        </div>

        {/* Card centralizado sem menu nem links dispersivos */}
        <div className="relative rounded-3xl bg-[#013F99]/20 border border-[#013F99]/60 p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6 overflow-hidden">
          {/* Barrinha de luz no topo */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#FB6601] to-transparent" />

          {/* Selo (laranja): FALTA SÓ UM PASSO */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FB6601]/20 border border-[#FB6601] text-xs sm:text-sm font-bold text-[#FB6601] tracking-wider uppercase">
              FALTA SÓ UM PASSO
            </span>
          </div>

          {/* Título */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Seu cadastro foi feito! Agora entre no <span className="text-[#FB6601]">Grupo VIP</span>
          </h1>

          {/* Texto descritivo */}
          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-lg mx-auto">
            É lá que vão chegar as aulas, o desafio e a novidade da Turma Fundadora. Toque no botão abaixo e entre agora, para não perder a primeira aula no sábado, às 11h.
          </p>

          {/* Botão (laranja, grande, logo abaixo do texto) que abre em nova aba */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 sm:py-5 px-6 rounded-full bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-2xl shadow-[#FB6601]/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 fill-white shrink-0" />
              <span>ENTRAR NO GRUPO VIP AGORA</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5] shrink-0" />
            </a>
          </div>

          {/* Texto pequeno sem outros links */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-neutral-300 leading-relaxed">
              Se o botão não abrir, salve o nosso número e tente de novo, ou chame a equipe no WhatsApp:{' '}
              <span className="font-bold text-white whitespace-nowrap">
                (11) 94444-8581
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
