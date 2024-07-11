import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import { fileURLToPath, URL } from 'node:url'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
	base: '/DjConnect/',
	server: {
		port: 9090,
	},
	plugins: [
		vue(),
		eslint({
			cache: false,
			include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
		}),
	],
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()],
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			app: fileURLToPath(new URL('./src/app', import.meta.url)),
			pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
			widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
			features: fileURLToPath(new URL('./src/features', import.meta.url)),
			entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
			shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
		},
	},
})
