import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function photoUploadPlugin() {
  return {
    name: 'photo-upload-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/upload-photo', (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { dataUrl } = JSON.parse(body);
              if (dataUrl && dataUrl.includes('base64,')) {
                const base64Data = dataUrl.split('base64,')[1];
                const buffer = Buffer.from(base64Data, 'base64');
                
                const publicDir = path.resolve(__dirname, 'public/assets');
                if (!fs.existsSync(publicDir)) {
                  fs.mkdirSync(publicDir, { recursive: true });
                }
                const srcDir = path.resolve(__dirname, 'src/assets/images');
                if (!fs.existsSync(srcDir)) {
                  fs.mkdirSync(srcDir, { recursive: true });
                }
                
                fs.writeFileSync(path.join(publicDir, 'nane_exact_photo.jpg'), buffer);
                fs.writeFileSync(path.join(srcDir, 'nane_exact_photo.jpg'), buffer);
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, url: '/assets/nane_exact_photo.jpg' }));
                return;
              }
            } catch (err) {
              console.error('Upload error:', err);
            }
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid data' }));
          });
        } else if (req.url === '/api/upload-logo' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { dataUrl } = JSON.parse(body);
              if (dataUrl && dataUrl.includes('base64,')) {
                const base64Data = dataUrl.split('base64,')[1];
                const buffer = Buffer.from(base64Data, 'base64');
                
                const publicDir = path.resolve(__dirname, 'public/assets');
                if (!fs.existsSync(publicDir)) {
                  fs.mkdirSync(publicDir, { recursive: true });
                }
                const srcDir = path.resolve(__dirname, 'src/assets/images');
                if (!fs.existsSync(srcDir)) {
                  fs.mkdirSync(srcDir, { recursive: true });
                }
                
                fs.writeFileSync(path.join(publicDir, 'nane_libras_logo.png'), buffer);
                fs.writeFileSync(path.join(srcDir, 'nane_libras_logo.png'), buffer);
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, url: '/assets/nane_libras_logo.png' }));
                return;
              }
            } catch (err) {
              console.error('Upload logo error:', err);
            }
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid logo data' }));
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), photoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
