import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        muted: "rgb(var(--muted))",
        "muted-foreground": "rgb(var(--muted-foreground))",
        accent: "rgb(var(--accent))",
        "accent-blue": "rgb(var(--accent-blue))",
        "accent-purple": "rgb(var(--accent-purple))",
        "accent-pink": "rgb(var(--accent-pink))",
        "accent-cyan": "rgb(var(--accent-cyan))",
        "accent-emerald": "rgb(var(--accent-emerald))",
        "accent-orange": "rgb(var(--accent-orange))",
        "accent-red": "rgb(var(--accent-red))",
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        success: "rgb(var(--success))",
        warning: "rgb(var(--warning))",
        error: "rgb(var(--error))",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
      },
      spacing: {
        xs: 'var(--space-1)',
        sm: 'var(--space-2)',
        md: 'var(--space-3)',
        lg: 'var(--space-4)',
        xl: 'var(--space-5)',
        '2xl': 'var(--space-6)',
        '3xl': 'var(--space-8)',
        '4xl': 'var(--space-10)',
        '5xl': 'var(--space-12)',
        '6xl': 'var(--space-16)',
        '7xl': 'var(--space-20)',
        '8xl': 'var(--space-24)',
        '9xl': 'var(--space-32)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        base: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
        'glow-lg': 'var(--shadow-glow-lg)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};

export default config;