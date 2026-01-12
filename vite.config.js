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
            host: process.env.REPL_SLUG && process.env.REPL_OWNER
                ? `5173-${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
                : 'localhost',
            protocol: 'wss',
            clientPort: 443,
        },
    },
});
