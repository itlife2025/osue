import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: { alias: { '@': '/src' } },
    server: {
        proxy: {
            '/v1': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
            }
        }
    }
});