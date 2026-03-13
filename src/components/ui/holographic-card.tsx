"use client";

import React, { useRef } from 'react';

interface HolographicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  annotation?: string;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  title,
  description,
  icon,
  annotation
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
        card.style.setProperty('--bg-x', '50%');
        card.style.setProperty('--bg-y', '50%');
    };

    return (
        <div 
            className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 ease-out hover:bg-white/[0.05]"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.05), 0 10px 40px rgba(0, 0, 0, 0.5)",
            }}
        >
            {/* Holographic glow effect */}
            <div 
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
                }}
            />
            
            <div 
                className="pointer-events-none absolute inset-0 opacity-0 mix-blend-color-dodge transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'var(--bg-x, 50%) var(--bg-y, 50%)',
                    opacity: 0.15,
                }}
            />

            <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6 font-medium">
                  {description}
                </p>
                {annotation && (
                  <div className="text-xs text-zinc-500 font-medium border-l-2 border-white/10 pl-3">
                    {annotation}
                  </div>
                )}
            </div>
        </div>
    );
};
