import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ArrowRight, 
  Check, 
  HelpCircle,
  ChevronDown,
  Instagram,
  Tv,
  Users,
  Award,
  Sparkles,
  HeartHandshake,
  Quote
} from 'lucide-react';
import LogoSlot from './LogoSlot';
import LeadCaptureModal from './LeadCaptureModal';

// Imagens fixas e oficiais do projeto
const NANE_HERO_PHOTO = '/src/assets/images/nane_exact_photo.jpg';
const NANE_BROTHER_PHOTO = '/src/assets/images/nane_brother_study_1790907722780.jpg';
const MARIA_CLARA_PHOTO = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

export default function LPVideo() {
  // Modal de captura (pop-up ao clicar em qualquer CTA)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FAQ Accordion State (Seção 6)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Meta Pixel: PageView na Landing Page
  useEffect(() => {
    if (typeof (window as any).trackMetaPageView === 'function') {
      (window as any).trackMetaPageView();
    } else if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  const handleOpenLeadModal = () => {
    setIsModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Perguntas rápidas da Seção 6
  const faqs = [
    {
      q: 'É gratuito?',
      a: 'Sim. O Grupo VIP é gratuito.'
    },
    {
      q: 'Nunca estudei Libras. Serve para mim?',
      a: 'Serve. As aulas foram pensadas para quem está começando e para quem já estudou e trava.'
    },
    {
      q: 'Vou receber muitas mensagens?',
      a: 'Não. Só a equipe envia mensagens no grupo, sempre com conteúdo ou aviso importante.'
    },
    {
      q: 'Como vou receber as aulas?',
      a: 'Por link, direto no grupo. Você assiste quando puder.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1A4F] text-white font-['Poppins',sans-serif] selection:bg-[#FB6601] selection:text-white relative overflow-x-hidden">
      {/* Grafismos sutis de conexões */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#013F99]/60 to-transparent blur-[120px]" />
        <div className="absolute top-[35%] -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#013F99]/50 via-[#FB6601]/10 to-transparent blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-[#013F99]/40 blur-[160px]" />
      </div>

      {/* =========================================================================
          HEADER COM ESPAÇO PARA LOGOMARCA
          ========================================================================= */}
      <header className="border-b border-[#013F99]/40 bg-[#0A1A4F]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <LogoSlot variant="header" />

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#FB6601] animate-pulse" />
              Grupo VIP no WhatsApp
            </span>
            <button
              onClick={handleOpenLeadModal}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#FB6601]/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Quero entrar no Grupo VIP
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SEÇÃO 1 · HERO (PRIMEIRA DOBRA)
          Manter a foto da Nane à direita como está atualmente
          ========================================================================= */}
      <section className="pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 relative bg-gradient-to-b from-[#0A1A4F] via-[#0A1A4F] to-[#013F99]/30">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna de Texto (À esquerda no desktop, embaixo no celular) */}
          <div className="w-full lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Selo pequeno (laranja): GRUPO VIP GRATUITO */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FB6601]/15 border border-[#FB6601] text-xs text-[#FB6601] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FB6601] animate-ping" />
                GRUPO VIP GRATUITO
              </span>
            </div>

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
              Aprenda a conversar em <span className="text-[#FB6601]">Libras de verdade</span>, mesmo que você trave ou nunca tenha estudado
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Entre no Grupo VIP da Nane Libras e receba aulas exclusivas, um desafio de 3 dias para começar no mundo da Libras e, em primeira mão, a Black Antecipada da Trilha da Fluência 2.0.
            </p>

            {/* Botão de CTA Pílula em Laranja */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleOpenLeadModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-[#FB6601]/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>QUERO ENTRAR NO GRUPO VIP</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <p className="text-xs text-neutral-400 font-medium">
                Clique aqui e entre gratuitamente
              </p>
            </div>
          </div>

          {/* Coluna Direita: Foto da Nane mantida à direita com moldura oficial */}
          <div className="w-full lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[390px]">
              {/* Moldura da Foto Principal da Nane */}
              <div className="relative aspect-[4/4.8] rounded-3xl overflow-hidden bg-gradient-to-b from-[#013F99]/40 to-[#0A1A4F] border-2 border-[#013F99]/60 shadow-2xl p-2">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#FB6601] to-transparent z-20" />

                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#07133B]">
                  <img
                    src={NANE_HERO_PHOTO}
                    alt="Nane Libras sinalizando Eu Te Amo em Libras com sorriso caloroso"
                    className="w-full h-full object-cover object-[54%_25%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A4F] via-[#0A1A4F]/20 to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Badge da Nane */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-[#0A1A4F]/90 border border-[#013F99]/80 backdrop-blur-md text-left pointer-events-none">
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      Nane Libras
                      <span className="text-[#FB6601]">✓</span>
                    </span>
                    <span className="text-[10px] text-neutral-300 block leading-tight">
                      Apresentadora bilíngue na TV Canção Nova & Especialista em Neurociência
                    </span>
                  </div>
                </div>
              </div>

              {/* Detalhe de mãos em sinais */}
              <div className="absolute -bottom-4 -left-4 w-18 h-18 rounded-2xl overflow-hidden border-2 border-[#013F99] shadow-xl bg-[#0A1A4F] hidden sm:block">
                <img
                  src="/src/assets/images/libras_hands_detail_1790213137292.jpg"
                  alt="Mãos em Libras"
                  className="w-full h-full object-cover scale-110"
                />
              </div>

              {/* Selo circular de 25 anos */}
              <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#013F99] border-2 border-[#FB6601] p-1 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full animate-[spin_16s_linear_infinite] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-white text-[8.5px] font-bold tracking-widest uppercase">
                    <path
                      id="heroCirclePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text>
                      <textPath href="#heroCirclePath">
                        25 ANOS INTERPRETANDO LIBRAS NA TV •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute w-10 h-10 rounded-full bg-[#0A1A4F] border border-white/20 flex items-center justify-center text-[#FB6601]">
                  <Tv className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2 · O QUE VOCÊ RECEBE NO GRUPO VIP (FUNDO CLARO)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F8FAFC] text-[#0A1A4F] relative">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#013F99]/10 text-[#013F99] text-xs font-bold uppercase tracking-wider">
              CONTEÚDOS E BENEFÍCIOS EXCLUSIVOS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A1A4F] tracking-tight">
              O que você recebe no <span className="text-[#FB6601]">Grupo VIP</span>
            </h2>
          </div>

          {/* Lista dos 5 itens com emojis solicitados */}
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-md hover:shadow-lg transition-shadow flex items-start gap-4 text-left">
              <span className="text-2xl sm:text-3xl shrink-0 pt-0.5">🎬</span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#0A1A4F]">
                  Aulas exclusivas
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Por que tanta gente aprende Libras e trava, e como começar do jeito certo.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-md hover:shadow-lg transition-shadow flex items-start gap-4 text-left">
              <span className="text-2xl sm:text-3xl shrink-0 pt-0.5">👀</span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#0A1A4F]">
                  Treino do olho
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  O primeiro passo do Método VIVA, com teste e plano de 7 dias.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-md hover:shadow-lg transition-shadow flex items-start gap-4 text-left">
              <span className="text-2xl sm:text-3xl shrink-0 pt-0.5">🎯</span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#0A1A4F]">
                  Desafio de 3 dias, Minha Primeira Conversa
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Missões curtas para você usar Libras já na primeira semana.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-md hover:shadow-lg transition-shadow flex items-start gap-4 text-left">
              <span className="text-2xl sm:text-3xl shrink-0 pt-0.5">📘</span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#0A1A4F]">
                  Guia gratuito: "Como escolher um curso que vai te fazer fluente em Libras"
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Material completo em PDF para te orientar em cada etapa do aprendizado.
                </p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#FB6601] shadow-md hover:shadow-lg transition-shadow flex items-start gap-4 text-left">
              <span className="text-2xl sm:text-3xl shrink-0 pt-0.5">🔔</span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#0A1A4F]">
                  Em primeira mão: a abertura da Turma Fundadora da Trilha da Fluência 2.0
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Com só 30 vagas e presentes que não vão se repetir.
                </p>
              </div>
            </div>
          </div>

          {/* Botão em Laranja levando ao formulário */}
          <div className="text-center pt-2">
            <button
              onClick={handleOpenLeadModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-[#FB6601]/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>QUERO ENTRAR NO GRUPO VIP</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3 · FRASE DE IMPACTO (FUNDO AZUL)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#081540] border-y border-[#013F99]/40 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#013F99]/40 border border-[#FB6601]/40 flex items-center justify-center text-[#FB6601] mx-auto shadow-lg">
            <Quote className="w-7 h-7" />
          </div>

          {/* Frase de impacto */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            "Saber sinais não é saber conversar."
          </h2>

          {/* Texto explicativo */}
          <p className="text-base sm:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Muita gente faz curso, decora sinais e, na hora que uma pessoa surda aparece na frente, trava. No Grupo VIP você vai entender por que isso acontece e como mudar, seja para usar no trabalho, na família ou na igreja.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4 · QUEM É A NANE? (QUEM VAI TE ENSINAR)
          Deixar um espaço para incluir a foto da Nane com o irmão ao lado direito
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Coluna de Texto (Lado Esquerdo) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FB6601] font-mono">
                SUA PROFESSORA E MENTORA
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Quem vai te ensinar
              </h2>
            </div>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-medium">
              Eu sou a Nane. Aprendi Libras para parar de brigar com o meu irmão surdo, e a Libras virou a minha vida.
            </p>

            {/* Tópicos com checks */}
            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FB6601]/20 border border-[#FB6601] flex items-center justify-center text-[#FB6601] shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base text-neutral-200 font-semibold">
                  Mais de 25 anos como intérprete de Libras
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FB6601]/20 border border-[#FB6601] flex items-center justify-center text-[#FB6601] shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base text-neutral-200 font-semibold">
                  Pioneira da janela de Libras ao vivo na TV brasileira
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FB6601]/20 border border-[#FB6601] flex items-center justify-center text-[#FB6601] shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base text-neutral-200 font-semibold">
                  Cerca de 5 mil alunos formados
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FB6601]/20 border border-[#FB6601] flex items-center justify-center text-[#FB6601] shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base text-neutral-200 font-semibold">
                  Família surda: o meu irmão e a minha cunhada são surdos e participam das avaliações dos meus alunos
                </span>
              </li>
            </ul>
          </div>

          {/* Coluna Direita: Foto da Nane com o irmão perfeitamente enquadrada */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[480px] sm:max-w-[520px] space-y-3">
              {/* Moldura elegante com proporção 4:3 para enquadrar perfeitamente ambos */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-b from-[#013F99]/40 to-[#0A1A4F] border-2 border-[#013F99]/80 shadow-2xl p-2">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#07133B]">
                  <img
                    src={NANE_BROTHER_PHOTO}
                    alt="Nane Libras com seu irmão surdo"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Legenda limpa e legível abaixo da foto, sem obstruir os rostos */}
              <div className="p-3.5 rounded-2xl bg-[#013F99]/25 border border-[#013F99]/60 flex items-center justify-between text-left shadow-lg">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Nane e seu irmão surdo
                  </span>
                  <span className="text-[11px] text-neutral-300 block">
                    A motivação que transformou a Libras em propósito de vida
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FB6601]/20 text-[#FB6601] border border-[#FB6601]/40 shrink-0">
                  Família Surda
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5 · PROVA (MARIA CLARA)
          Deixar um espaço para inserir foto da Maria Clara ao lado direito
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#081540] border-y border-[#013F99]/40 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Coluna de Texto (Lado Esquerdo) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FB6601] font-mono">
                MÉTODO COMPROVADO NA PRÁTICA
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Do zero a intérprete em 9 meses
              </h2>
            </div>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-medium">
              A minha filha, Maria Clara, começou do zero em Libras. Em 9 meses se tornou intérprete profissional e hoje trabalha comigo. Não foi talento: foi método e prática com quem vive a língua.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#013F99]/30 border border-[#013F99] text-xs text-neutral-200">
                ✨ <strong className="text-white">Sem decorar regras secas:</strong> imersão direta e prática com a comunidade surda.
              </div>
            </div>
          </div>

          {/* Coluna Direita: Foto da Maria Clara perfeitamente enquadrada */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] sm:max-w-[380px] space-y-3">
              {/* Moldura elegante */}
              <div className="relative aspect-[4/4.8] rounded-3xl overflow-hidden bg-gradient-to-b from-[#013F99]/40 to-[#0A1A4F] border-2 border-[#013F99]/80 shadow-2xl p-2">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#07133B]">
                  <img
                    src={MARIA_CLARA_PHOTO}
                    alt="Maria Clara - Intérprete profissional de Libras"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Legenda limpa e legível abaixo da foto, sem obstruir o rosto */}
              <div className="p-3.5 rounded-2xl bg-[#013F99]/25 border border-[#013F99]/60 flex items-center justify-between text-left shadow-lg">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Maria Clara
                  </span>
                  <span className="text-[11px] text-neutral-300 block">
                    Intérprete profissional formada pelo método em 9 meses
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FB6601]/20 text-[#FB6601] border border-[#FB6601]/40 shrink-0">
                  Caso Real
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6 · PERGUNTAS RÁPIDAS
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FB6601]/20 text-[#FB6601] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire suas dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas rápidas
          </h2>
        </div>

        {/* Acordeão de Perguntas e Respostas */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#013F99]/60 bg-[#013F99]/20 overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FB6601] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-neutral-200 border-t border-white/5 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botão Final em Laranja */}
        <div className="text-center pt-4">
          <button
            onClick={handleOpenLeadModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#FB6601] to-[#FF8A2A] hover:from-[#FF8A2A] hover:to-[#FB6601] text-white font-extrabold text-base sm:text-lg tracking-wide shadow-2xl shadow-[#FB6601]/40 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span>QUERO ENTRAR NO GRUPO VIP</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          RODAPÉ
          Nane Libras · Sua escola de Libras · Instagram @nanelibras
          ========================================================================= */}
      <footer className="border-t border-[#013F99]/50 bg-[#07133B] py-8 px-4 sm:px-6 text-xs text-neutral-300">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <LogoSlot variant="footer" />

          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">
              Nane Libras · Sua escola de Libras
            </p>
            <p className="text-neutral-400">
              Libras não se decora. Se vive.
            </p>
          </div>

          <div>
            <a
              href="https://instagram.com/nanelibras"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
            >
              <Instagram className="w-4 h-4 text-[#FB6601]" />
              <span>Instagram @nanelibras</span>
            </a>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAIS DE CAPTURA E FOTOS
          ========================================================================= */}
      {/* Pop-up Modal de Captura de Lead (Nome, E-mail e WhatsApp obrigatórios) */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
