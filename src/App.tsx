/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LPVideo from './components/LPVideo';
import Sitemap from './components/Sitemap';
import ThankYou from './components/ThankYou';

/**
 * Detecção de Ambiente:
 * Retorna true se o hostname ou href contiver qualquer uma das strings indicadoras de proxy
 * (Google IDX, Cloud Shell, WebContainer, Stackblitz, CodeSandbox, etc.)
 */
export function checkPreviewEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  const { hostname, href } = window.location;
  const proxyIndicators = [
    'googleusercontent',
    'webcontainer',
    'shim',
    '.goog',
    'scf.usercontent',
    'stackblitz',
    'codesandbox',
  ];
  return proxyIndicators.some(
    (indicator) => hostname.includes(indicator) || href.includes(indicator)
  );
}

export default function App() {
  const isPreview = checkPreviewEnvironment();

  // Seleção de Roteador Híbrido Agressivo:
  // - Preview: HashRouter (evita erros 404 em URLs complexas de proxy no refresh)
  // - Produção: BrowserRouter (obrigatório para UTMs, pixels de rastreamento e SEO)
  const Router = isPreview ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Routes>
        {/* Redirecionamento Inteligente da Raiz (/):
            - Preview: redireciona para /sitemap
            - Produção: redireciona para /lp-video */}
        <Route
          path="/"
          element={
            <Navigate to={isPreview ? '/sitemap' : '/lp-video'} replace />
          }
        />

        {/* Rotas da Aplicação */}
        <Route path="/sitemap" element={<Sitemap isPreview={isPreview} />} />
        <Route path="/lp-video" element={<LPVideo />} />
        <Route path="/obrigado" element={<ThankYou />} />

        {/* Fallback de rotas inexistentes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
