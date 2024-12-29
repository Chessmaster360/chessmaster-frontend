/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'bleu-gray-100': 'var(--Bleu-gray-100, #F1F5F9)',
  			customYellow: '#FBBF24',
  			customBlue: '#3B82F6',
  			black: {
  				'100': '#010103',
  				'200': '#0E0E10',
  				'300': '#1C1C21',
  				'500': '#3A3A49',
  				'600': '#1A1A1A',
  				DEFAULT: '#000'
  			},
  			white: {
  				'500': '#62646C',
  				'600': '#AFB0B6',
  				'700': '#D6D9E9',
  				'800': '#E4E4E6',
  				DEFAULT: '#FFFFFF'
  			}
  		},
  		spacing: {
  			'128': '32rem'
  		},
  		fontFamily: {
  			customFont: ['Poppins', 'sans-serif'],
  			generalsans: ['General Sans', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}

