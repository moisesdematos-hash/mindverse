/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mindverse: {
          void: '#05070B',       // Preto cósmico mais profundo
          deep: '#0B0F17',       // Preto profundo de fundo
          midnight: '#0F172A',   // Azul meia-noite para cartões e containers
          darkblue: '#131D31',   // Tom intermédio entre midnight e surface
          graphite: '#1E293B',   // Grafite para bordas e superfícies
          slate: '#334155',      // Grafite claro para separadores
          muted: '#94A3B8',      // Texto secundário refinado
          softwhite: '#F8FAFC',  // Branco suave para títulos
          gold: {
            DEFAULT: '#D4AF37',  // Dourado padrão Mindverse
            subtle: '#D4AF37',   // Dourado subtil clássico
            light: '#F5E6B3',    // Dourado claro para highlights
            dim: '#8C7426',      // Dourado escuro para bordas finas
            accent: '#C5A059',   // Dourado para badges e acentos
          },
          cyan: {
            glow: '#38BDF8',     // Cyan subtil futurista para IA ativa
            dim: '#0369A1',
          }
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px -3px rgba(212, 175, 55, 0.15)',
        'cyan-glow': '0 0 25px -4px rgba(56, 189, 248, 0.18)',
        'subtle-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
