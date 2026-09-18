import { NavLink } from 'react-router-dom';
import { Award, FileBarChart, Home, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, Transition } from 'framer-motion';

import { BrandLogo } from '@/components/BrandLogo';

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: Home, testId: 'nav-inicio', end: true },
  { to: '/relatorio', label: 'Relatorio', icon: FileBarChart, testId: 'nav-relatorio', end: false },
  { to: '/certificado', label: 'Certificado', icon: Award, testId: 'nav-certificado', end: false },
] as const;

// Transition configurada conforme solicitado: suave, natural, contínua
const transition: Transition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.35,
};

const sidebarVariants = {
  expanded: { width: 244 },
  collapsed: { width: 76 }
};

const labelVariants = {
  expanded: {
    opacity: 1,
    maxWidth: 160,
    marginLeft: 12,
  },
  collapsed: {
    opacity: 0,
    maxWidth: 0,
    marginLeft: 0,
  },
};

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <motion.aside
      className="sidebar"
      data-testid="sidebar"
      data-collapsed={collapsed}
      initial={false}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={transition}
      style={{ overflowX: 'hidden' }}
    >
      <div className="sidebar__brand">
        <BrandLogo collapsed={collapsed} transition={transition} />
      </div>

      <nav className="sidebar__nav" aria-label="Navegacao principal">
        {NAV_ITEMS.map(({ to, label, icon: Icon, testId, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            data-testid={testId}
            title={collapsed ? label : undefined}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            <Icon className="sidebar__link-icon" size={20} aria-hidden="true" />
            <motion.span
              className="sidebar__link-label"
              initial={false}
              animate={collapsed ? "collapsed" : "expanded"}
              variants={labelVariants}
              transition={transition}
              style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {label}
            </motion.span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="sidebar__toggle"
        data-testid="sidebar-toggle"
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-controls="sidebar"
        aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
      >
        <ToggleIcon className="sidebar__link-icon" size={20} aria-hidden="true" />
        <motion.span
          className="sidebar__link-label"
          initial={false}
          animate={collapsed ? "collapsed" : "expanded"}
          variants={labelVariants}
          transition={transition}
          style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          Recolher
        </motion.span>
      </button>
    </motion.aside>
  );
}
