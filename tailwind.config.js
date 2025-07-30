/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.html",
    "./public/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Brandon's Handyman color palette
        'bg-primary': '#bdbdbd',     // Light Grey - Primary background
        'bg-alt': '#535258',         // Grey - Alt sections/cards
        'bg-deep': '#020202',        // Black - Footer or deep sections
        'text-primary': '#020202',   // Black - Primary text on light backgrounds
        'text-light': '#bdbdbd',     // Light Grey - Light text on dark
        'text-muted': '#535258',     // Grey - Muted text or helper labels
        'accent-primary': '#f63c10', // Orange - Primary CTA buttons/links
        'accent-secondary': '#f58a6d', // Salmon - Secondary buttons/hover/focus
        'accent-highlight': '#fce85b', // Yellow - Highlight or info color
        'border-soft': '#bdbdbd',    // Light Grey - Soft outlines
        'border-main': '#535258',    // Grey - Main borders
        // Legacy support (keeping original for any existing uses)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#f63c10',
          600: '#f63c10',
          700: '#f63c10',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#535258',
          600: '#535258',
          700: '#020202',
        }
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(83, 82, 88, 0.3), 0 2px 4px -1px rgba(83, 82, 88, 0.06)',
        'custom-lg': '0 10px 15px -3px rgba(83, 82, 88, 0.3), 0 4px 6px -2px rgba(83, 82, 88, 0.05)',
      }
    },
  },
  plugins: [],
}
