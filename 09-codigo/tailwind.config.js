/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: {
          DEFAULT: '#111827',
          card: '#111827',
          elevated: '#1a2234',
          border: '#1f293d',
        },
        brand: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          secondary: '#6366f1',
          glow: '#60a5fa',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          ai: '#a855f7',
        },
        accent: {
          purple: '#a855f7',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#ef4444',
          indigo: '#6366f1',
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(26, 34, 52, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%)',
      },
      boxShadow: {
        'glow-brand': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'glow-ai': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'glow-success': '0 0 20px -5px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [],
};
