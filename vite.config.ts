import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Auto-copy Dr. Ritesh Kumar photo
try {
  const candidatePhotos = [
    'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784890934445.png',
    path.resolve(__dirname, 'Picsart_25-05-01_15-35-34-079.jpg'),
    'C:/Users/pavan/.gemini/antigravity-ide/brain/a01c71ff-b8b6-4b78-bf81-200f76ea257c/media__1784889985119.jpg',
    path.resolve(__dirname, 'IMG-20250329-WA0009.jpg')
  ];
  const destPublic = path.resolve(__dirname, 'public', 'dr_ritesh_kumar.jpg');
  for (const src of candidatePhotos) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destPublic);
      break;
    }
  }

  const joelPhotoCandidates = [
    'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784891426123.png',
    'C:/Users/pavan/.gemini/antigravity-ide/brain/3902d3e3-cf69-45bc-852c-f6b01f66008e/media__1784890920527.png'
  ];
  for (const jcand of joelPhotoCandidates) {
    if (fs.existsSync(jcand)) {
      fs.copyFileSync(jcand, path.resolve(__dirname, 'public', 'paladugu_deep_joel.jpg'));
      break;
    }
  }
} catch (e) {
  console.error('Photo copy notice:', e);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
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
