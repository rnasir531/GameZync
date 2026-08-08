'use client';

import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverEffect = true, onClick, style = {} }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -5, scale: 1.015, boxShadow: '0 20px 40px -15px rgba(16,185,129,0.25)' } : {}}
      whileTap={hoverEffect ? { scale: 0.98 } : {}}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className={`glass-card ${className}`}
      style={{
        background: 'rgba(18, 24, 38, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}
