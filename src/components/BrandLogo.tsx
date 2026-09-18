import { brand } from '@/brand/brand';
import { motion, Transition } from 'framer-motion';

export interface BrandLogoProps {
  collapsed: boolean;
  transition?: Transition;
}

/**
 * Exibe a marca do projeto no topo da sidebar.
 * 
 * Renderiza ambos os assets fornecidos simultaneamente no DOM:
 * - logo completa (brand-logo-full)
 * - ícone (brand-logo-icon)
 * 
 * A transição ocorre por meio de opacidade (crossfade) e visibilidade, sem
 * "flicks" visuais, mantendo ambas as logos montadas.
 * O ícone é posicionado de forma a coincidir exatamente com a porção "ícone"
 * da logo completa, garantindo estabilidade absoluta.
 */
export function BrandLogo({ collapsed, transition }: BrandLogoProps) {
  // A logo completa renderizada tem 168x45.
  // O seu símbolo (primeiros 64px de 240px no viewBox original) representa 45x45.
  // Para não haver shrink/scale na transição, forçamos o ícone avulso a ter 45x45.
  const fullWidth = 168;
  const iconWidth = 45;
  const height = 45;

  return (
    <div
      data-testid="brand-logo-wrapper"
      style={{
        position: 'relative',
        width: fullWidth, // Container mantém a largura estática da maior logo
        height,
        flexShrink: 0
      }}
    >
      {/* Ícone */}
      <motion.img
        className="brand-logo brand-logo--icon"
        data-testid="brand-logo-icon"
        src={brand.logoIcon}
        alt={`${brand.name} (simbolo)`}
        aria-hidden={!collapsed}
        initial={false}
        animate={{
          opacity: collapsed ? 1 : 0,
          visibility: collapsed ? 'visible' : 'hidden'
        }}
        transition={transition}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: iconWidth,
          height,
          display: 'block',
          maxWidth: 'none',
        }}
      />

      {/* Logo Completa */}
      <motion.img
        className="brand-logo brand-logo--full"
        data-testid="brand-logo-full"
        src={brand.logoFull}
        alt={brand.name}
        aria-hidden={collapsed}
        initial={false}
        animate={{
          opacity: collapsed ? 0 : 1,
          visibility: collapsed ? 'hidden' : 'visible'
        }}
        transition={transition}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: fullWidth,
          height,
          display: 'block',
          maxWidth: 'none',
        }}
      />
    </div>
  );
}
