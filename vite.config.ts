import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = command === 'serve';

  return {
    plugins: [react()],
    define: {
      // Em produção (build), chaves privadas NUNCA são embutidas no pacote estático do frontend
      '__GROQ_API_KEY__': JSON.stringify(isDev ? (env.GROQ_API_KEY || '') : ''),
      '__GEMINI_API_KEY__': JSON.stringify(isDev ? (env.GEMINI_API_KEY || '') : ''),
      '__DEFAULT_SOLO_MODEL__': JSON.stringify(env.DEFAULT_SOLO_MODEL || 'openai/gpt-oss-120b'),
      '__DEFAULT_DEBATE_MODEL__': JSON.stringify(env.DEFAULT_DEBATE_MODEL || 'qwen/qwen3.8-27b'),
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            i18n: ['i18next', 'react-i18next'],
            supabase: ['@supabase/supabase-js'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});
