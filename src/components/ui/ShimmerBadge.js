'use client';

import { motion } from 'framer-motion';

export default function ShimmerBadge({ text, icon = 'fa-solid fa-sparkles', color = '#10b981' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        color: color,
        borderRadius: '9999px',
        padding: '4px 14px',
        fontSize: '12px',
        fontWeight: '800',
        letterSpacing: '0.3px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <i className={icon} style={{ fontSize: '11px' }}></i>
      <span>{text}</span>
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
          transform: 'skewX(-20deg)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}
