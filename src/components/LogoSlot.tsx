import React from 'react';

interface LogoSlotProps {
  variant: 'header' | 'footer';
  className?: string;
}

// Ícone do monograma oficial N + L da Nane Libras
export function NaneLogoSymbol({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
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
             C 114,128 120,128 120,128 Z"
          fill="#0048B5"
        />

        {/* Traço diagonal estilizado em Laranja (#FF5700) */}
        <path
          d="M 87,90 
             L 112,54 
             C 116,48 124,47 129,51 
             C 134,55 135,63 131,69 
             L 106,105 
             C 102,111 94,112 89,108 
             C 84,104 83,96 87,90 Z"
          fill="#FF5700"
        />

        {/* Ponto de acento vibrante */}
        <circle cx="100" cy="100" r="10" fill="#FF5700" opacity="0.9" />
      </g>
    </svg>
  );
}

// Logomarca fixa oficial da Nane Libras (não editável em produção)
export default function LogoSlot({ variant, className = "" }: LogoSlotProps) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
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
    </div>
  );
}
