tailwind.config = {
theme: {
extend: {
colors: {
'main-black': '#050505',
'off-black': '#0f0f11',
'glass-border': 'rgba(255, 255, 255, 0.08)',
'main-purple': '#7D6EFC',
'sunset-orange': '#EFB521',
'electric-blue': '#2C71F6',
'polaroid-white': '#F2F0F5',
},
fontFamily: {
'sans': ['"Inter"', 'sans-serif'],
},
backgroundImage: {
'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
},
animation: {
'float': 'float 6s ease-in-out infinite',
'float-delayed': 'float 6s ease-in-out 3s infinite',
'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
},
keyframes: {
float: {
'0%, 100%': { transform: 'translateY(0)' },
'50%': { transform: 'translateY(-10px)' },
},
'pulse-glow': {
'0%, 100%': { opacity: '0.4' },
'50%': { opacity: '0.2' },
}
}
}
}
}
