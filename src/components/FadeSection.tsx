'use client';

/**
 * FadeSection — wrapper con Framer Motion para reveal al hacer scroll.
 * Usa whileInView para que cada sección aparezca suavemente cuando
 * el usuario llega a ella. viewport={{ once: true }} evita re-animaciones.
 *
 * Analogía: como abrir las persianas de a una habitación a la vez
 * mientras caminás por la casa — no todo a la vez, solo lo que ves.
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number; // segundos extra de delay (para secciones anidadas)
}

export default function FadeSection({
  children,
  className = '',
  id,
  delay = 0,
}: FadeSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
