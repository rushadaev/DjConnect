DJ Connect
Stack: Vue 3 + TypeScript + Vite
DEV: npm run dev
PROD: npm run build
Deploy
Настроены GitHub action, пуш в мастер -> запускает action и разворачивает на https://rushadaev.github.io/DjConnect/
В vite.config.ts прописывается base: '/DjConnect/', чтобы правильно работал vue router на GitHub Pages https://rushadaev.github.io/DjConnect/