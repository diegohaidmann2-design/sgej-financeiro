import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        allowedHosts: true,
        hmr: {
            host: '5173-iknw6zonta3xnkqc7owqq-bf560736.us1.manus.computer',
            protocol: 'wss',
            clientPort: 443,
        },
        cors: true,
    },
});
