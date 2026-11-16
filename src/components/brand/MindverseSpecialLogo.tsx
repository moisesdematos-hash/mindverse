import React from 'react';

interface MindverseSpecialLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  animated?: boolean;
  className?: string;
}

export const MindverseSpecialLogo: React.FC<MindverseSpecialLogoProps> = ({
  size = 'md',
  showWordmark = true,
  animated = true,
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 'w-10 h-10', text: 'text-xl', sub: 'text-[9px]', gap: 'gap-3' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-[10px]', gap: 'gap-3.5' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', sub: 'text-xs', gap: 'gap-4' },
  };

  const { icon, text, sub, gap } = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${gap} select-none ${className}`}>
      {/* Sacred Geometry Emblem */}
      <div className={`relative ${icon} shrink-0 flex items-center justify-center`}>
        {/* Ambient Backlight Glow */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-mindverse-gold.accent/25 via-mindverse-cyan-glow/20 to-mindverse-gold.subtle/30 blur-md pointer-events-none"
        />

        {/* SVG Crest */}
        <svg 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full relative z-10 drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)] ${
            animated ? 'transition-transform duration-500 hover:scale-105' : ''
          }`}
        >
          <defs>
            {/* Gold Metal Linear Gradients */}
            <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="60%" stopColor="#8C7426" />
              <stop offset="85%" stopColor="#F5E6B3" />
              <stop offset="100%" stopColor="#C5A059" />
            </linearGradient>

            <linearGradient id="cyanCore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <linearGradient id="innerGlow" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0B0F17" stopOpacity="0.2" />
            </linearGradient>

            {/* Filter for sacred halo */}
            <filter id="divineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Spheres (Armillary Sphere of Wisdom) */}
          <circle cx="60" cy="60" r="54" stroke="url(#goldSheen)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="60" cy="60" r="48" stroke="url(#goldSheen)" strokeWidth="1.2" opacity="0.6" />
          
          {/* Classical Laurel Wreath Elements (Left Arc) */}
          <path 
            d="M 28 60 C 26 40 38 24 55 18 C 52 23 48 30 46 38 C 42 35 36 38 34 44 C 32 50 34 56 38 60 C 33 63 30 70 32 77 C 35 84 41 87 46 84 C 48 90 53 96 58 99 C 40 96 28 80 28 60 Z" 
            fill="url(#goldSheen)" 
            opacity="0.85" 
          />
          {/* Classical Laurel Wreath Elements (Right Arc) */}
          <path 
            d="M 92 60 C 94 40 82 24 65 18 C 68 23 72 30 74 38 C 78 35 84 38 86 44 C 88 50 86 56 82 60 C 87 63 90 70 88 77 C 85 84 79 87 74 84 C 72 90 67 96 62 99 C 80 96 92 80 92 60 Z" 
            fill="url(#goldSheen)" 
            opacity="0.85" 
          />

          {/* Central Phi Octahedron / Quantum Hexagon */}
          <polygon 
            points="60,24 88,42 88,78 60,96 32,78 32,42" 
            stroke="url(#goldSheen)" 
            strokeWidth="1.8" 
            fill="url(#innerGlow)"
            opacity="0.75" 
          />

          {/* Internal Star of Wisdom (Connecting the Epistemic Nodes) */}
          <line x1="60" y1="24" x2="60" y2="96" stroke="url(#goldSheen)" strokeWidth="1" opacity="0.4" />
          <line x1="32" y1="42" x2="88" y2="78" stroke="url(#goldSheen)" strokeWidth="1" opacity="0.4" />
          <line x1="32" y1="78" x2="88" y2="42" stroke="url(#goldSheen)" strokeWidth="1" opacity="0.4" />

          {/* Central AI/Mind Singularity Diamond */}
          <polygon 
            points="60,44 74,60 60,76 46,60" 
            fill="url(#goldSheen)" 
            stroke="#FFF2D6" 
            strokeWidth="1.2"
          />

          {/* Quantum Nucleus (Cyan Flare) */}
          <circle cx="60" cy="60" r="5" fill="url(#cyanCore)" filter="url(#divineGlow)" />
          <circle cx="60" cy="60" r="2.2" fill="#FFFFFF" />

          {/* Epistemic Apex Star (North) */}
          <polygon points="60,11 62.5,16 68,16 63.5,19.5 65.5,25 60,21.5 54.5,25 56.5,19.5 52,16 57.5,16" fill="url(#goldSheen)" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-serif font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-mindverse-gold-light via-mindverse-gold-subtle to-mindverse-gold-accent leading-none ${text}`}>
              MINDVERSE
            </span>
          </div>
          <span className={`font-mono tracking-[0.3em] uppercase text-mindverse-muted/90 font-medium ${sub}`}>
            Intellectus Immortal • IA Dialética
          </span>
        </div>
      )}
    </div>
  );
};
