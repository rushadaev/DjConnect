### DJ Connect

Stack: Vue 3 + TypeScript + Vite

DEV: npm run dev

PROD: npm run build

### Deploy

Настроены GitHub action, пуш в мастер -> запускает action и разворачивает на https://rushadaev.github.io/DjConnect/

В vite.config.ts прописывается base: '/DjConnect/', чтобы правильно работал vue router на GitHub Pages https://rushadaev.github.io/DjConnect/

### QR-code

Изображение доступно по адресу https://dj-connect.xyz/dj/1/qr-code, где *1* - id диджея

QR код ведет на ссылку https://t.me/DjConnect_bot/track?startapp={$dj_id}

Этот параметр следует обрабатывать с помощью TWA.initDataUnsafe.start_param

**Например:**
```
const startParam = TWA.initDataUnsafe.start_param

this.$router.push({ name: 'DJProfile', params: { dj_id: startParam } });
```
