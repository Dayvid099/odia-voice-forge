
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(166, 100%, 42%)', // #00D4AA
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(166, 100%, 42%)'
				},
				secondary: {
					DEFAULT: 'hsl(217, 32%, 17%)', // #1E293B
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(38, 95%, 48%)', // #F59E0B
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Agent Lexi brand colors
				teal: {
					DEFAULT: 'hsl(166, 100%, 42%)', // #00D4AA
					light: 'hsl(166, 100%, 85%)',
					dark: 'hsl(166, 100%, 35%)'
				},
				slate: {
					DEFAULT: 'hsl(217, 32%, 17%)', // #1E293B
					light: 'hsl(217, 32%, 85%)',
					dark: 'hsl(217, 32%, 10%)'
				},
				amber: {
					DEFAULT: 'hsl(38, 95%, 48%)', // #F59E0B
					light: 'hsl(38, 95%, 85%)',
					dark: 'hsl(38, 95%, 35%)'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, hsl(166, 100%, 42%) 0%, hsl(38, 95%, 48%) 100%)',
				'gradient-hero': 'linear-gradient(135deg, hsl(166, 100%, 42%) 0%, hsl(217, 32%, 17%) 100%)',
				'gradient-card': 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(166, 100%, 95%) 100%)',
				'gradient-glow': 'radial-gradient(circle, hsl(166, 100%, 42%) 0%, transparent 70%)',
			},
			boxShadow: {
				'glow': '0 0 20px hsla(166, 100%, 42%, 0.3)',
				'teal': '0 0 20px hsla(166, 100%, 42%, 0.2)',
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
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
