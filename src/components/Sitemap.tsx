import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ExternalLink, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  Copy, 
  ArrowRight,
  Server,
  Layers
} from 'lucide-react';
import { checkPreviewEnvironment } from '../App';

interface SitemapProps {
  isPreview?: boolean;
}

export default function Sitemap({ isPreview: propIsPreview }: SitemapProps) {
  const [copied, setCopied] = useState(false);
  const [hostname, setHostname] = useState('');
  const [href, setHref] = useState('');
  const [matchedIndicator, setMatchedIndicator] = useState<string | null>(null);

  const proxyIndicators = [
    'googleusercontent',
    'webcontainer',
    'shim',
    '.goog',
    'scf.usercontent',
    'stackblitz',
    'codesandbox',
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentHost = window.location.hostname;
      const currentHref = window.location.href;
      setHostname(currentHost);
      setHref(currentHref);

      const matched = proxyIndicators.find(
        (ind) => currentHost.includes(ind) || currentHref.includes(ind)
      );
      setMatchedIndicator(matched || null);
    }
  }, []);

  const isPreview = propIsPreview !== undefined ? propIsPreview : checkPreviewEnvironment();

  const handleCopyUrl = (path: string) => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const routes = [
    {
      path: '/lp-video',
      name: 'Landing Page Oficial (Grupo VIP WhatsApp)',
      description: 'Página oficial da Nane Libras com as 6 seções: Hero com foto da Nane, O que você recebe (fundo claro), Frase de impacto (fundo azul), Quem vai te ensinar (foto Nane e irmão), Prova (foto Maria Clara) e Perguntas rápidas.',
      badge: 'Principal',
      badgeColor: 'text-[#FB6601] bg-[#FB6601]/10 border-[#FB6601]/40',
      recommended: true,
    },
    {
      path: '/obrigado',
      name: 'Página de Obrigado (Confirmação VIP)',
      description: 'Página pós-cadastro com "Falta só um passo", confirmação VIP e botão oficial em laranja para entrada no Grupo VIP do WhatsApp.',
      badge: 'Conversão',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
      recommended: false,
    },
    {
      path: '/admin-fotos',
      name: 'Gestor Privado de Fotos & Deploy Vercel',
      description: 'Painel exclusivo para subir os arquivos originais de fotos (ex: foto WhatsApp do irmão e foto da Nane) sem IA e instruções de sincronização com o GitHub e Vercel.',
      badge: 'Admin / Fotos',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
      recommended: false,
    },
    {
      path: '/sitemap',
      name: 'Mapa de Rotas & Diagnóstico (Sitemap)',
      description: 'Painel técnico de desenvolvimento para validação de ambiente (Google IDX, Cloud Shell, Stackblitz vs Vercel/AWS).',
      badge: 'Desenvolvimento',
      badgeColor: 'text-sky-400 bg-sky-950/60 border-sky-800/60',
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1A4F] text-neutral-100 flex flex-col justify-between font-['Poppins',sans-serif]">
      {/* Top Banner */}
      <div className="bg-[#013F99]/60 border-b border-[#013F99] px-4 py-2.5 text-center text-xs sm:text-sm">
        <span className="font-semibold text-[#FB6601]">⚡ ROTEAMENTO HÍBRIDO ATIVO:</span>{' '}
        <span className="text-neutral-200">
          Modo {isPreview ? 'HashRouter (Preview Blindado)' : 'BrowserRouter (Produção Vercel/AWS)'} em execução.
        </span>
      </div>

      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#013F99]/40 border border-[#013F99] flex items-center justify-center text-[#FB6601]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                Nane Libras · Mapa de Rotas
              </h1>
              <p className="text-sm text-neutral-300">
                Hub de navegação e diagnóstico de ambiente · Black Antecipada Trilha 2.0
              </p>
            </div>
          </div>
        </div>

        {/* Environment Diagnostic Card */}
        <div className="mb-8 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isPreview ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Ambiente Detectado</span>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  {isPreview ? (
                    <>
                      <span>Ambiente de Nuvem / Preview</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        HashRouter
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Ambiente de Produção</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        BrowserRouter
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/lp-video"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors shadow-lg shadow-amber-500/10"
              >
                <span>Acessar Landing Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs text-neutral-300">
            <div className="p-3 rounded-xl bg-black/40 border border-neutral-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-neutral-500" /> Hostname Atual
                </span>
                <span className="font-mono text-neutral-200">{hostname || 'detectando...'}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" /> Indicador Detectado
                </span>
                <span className="font-mono text-amber-400 font-semibold">
                  {matchedIndicator ? `"${matchedIndicator}" (proxy)` : 'Nenhum (produção direta)'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-neutral-800/80 space-y-1.5">
              <div className="text-neutral-400 flex items-center justify-between">
                <span>Vite Base Path</span>
                <span className="font-mono text-emerald-400 font-semibold">base: './' (ativo)</span>
              </div>
              <div className="text-neutral-400 flex items-center justify-between">
                <span>Regra de Fallback Vercel</span>
                <span className="font-mono text-neutral-200">vercel.json (configurado)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Rotas Disponíveis na Aplicação
            </h2>
            <span className="text-xs text-neutral-500">
              {routes.length} rotas mapeadas
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {routes.map((route) => (
              <div
                key={route.path}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  route.recommended
                    ? 'bg-gradient-to-r from-amber-950/20 via-neutral-900 to-neutral-900 border-amber-500/40 hover:border-amber-500/70 shadow-lg shadow-amber-950/20'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg border border-neutral-800">
                        {route.path}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${route.badgeColor}`}>
                        {route.badge}
                      </span>
                      {route.recommended && (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold">
                          <Flame className="w-3.5 h-3.5" /> Página Principal
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-neutral-100">
                      {route.name}
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                      {route.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={route.path}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        route.recommended
                          ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/10'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                      }`}
                    >
                      <span>Abrir Rota</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proxy Allowlist Information */}
        <div className="mt-8 p-5 rounded-2xl bg-black/50 border border-neutral-800/80">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Lista de Palavras-Chave de Ambientes de Proxy (Allowlist)
          </h3>
          <p className="text-xs text-neutral-400 mb-3">
            O seletor inteligente em <code>App.tsx</code> verifica se qualquer uma dessas strings está presente em <code>window.location.hostname</code> ou <code>href</code>. Se detectada, ativa automaticamente o <code>HashRouter</code>:
          </p>
          <div className="flex flex-wrap gap-2">
            {proxyIndicators.map((keyword) => {
              const isMatched = (hostname + href).includes(keyword);
              return (
                <span
                  key={keyword}
                  className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-colors ${
                    isMatched
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  {keyword} {isMatched && '✓ ativo'}
                </span>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 py-6 text-center text-xs text-neutral-500">
        <p>© 2026 Seja Libras · Arquitetura de Roteamento Híbrido Agressivo para Vite & React</p>
      </footer>
    </div>
  );
}
