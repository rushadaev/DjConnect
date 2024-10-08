import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import { fileURLToPath, URL } from 'node:url'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import fs from 'fs' // Import fs module
import path from 'path' // Import path module

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		base: '/DjConnect',
		server: {
			https: {
				key: fs.readFileSync(
					path.resolve(__dirname, 'localhost+2-key.pem')
				),
				cert: fs.readFileSync(
					path.resolve(__dirname, 'localhost+2.pem')
				)
			},
			host: '0.0.0.0',
			port: 9090
		},
		plugins: [
			vue(),
			eslint({
				cache: false,
				include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue']
			})
		],
		css: {
			postcss: {
				plugins: [tailwind(), autoprefixer()]
			}
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				app: fileURLToPath(new URL('./src/app', import.meta.url)),
				pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
				widgets: fileURLToPath(
					new URL('./src/widgets', import.meta.url)
				),
				features: fileURLToPath(
					new URL('./src/features', import.meta.url)
				),
				entities: fileURLToPath(
					new URL('./src/entities', import.meta.url)
				),
				shared: fileURLToPath(new URL('./src/shared', import.meta.url))
			}
		},
		define: {
			'process.env': env
		}
	}
})
