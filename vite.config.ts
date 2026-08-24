import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Automatically copy the exact user-uploaded background image into project and public directories
try {
  const sourceImg1 = 'C:\\Users\\aksha\\.gemini\\antigravity-ide\\brain\\440d65ca-848c-4d3e-af62-3013d32fcf7e\\.user_uploaded\\media_1787579731327.jpg';
  const sourceImg2 = 'C:\\Users\\aksha\\.gemini\\antigravity-ide\\brain\\440d65ca-848c-4d3e-af62-3013d32fcf7e\\.user_uploaded\\media_1787579242965.jpg';
  const sourcePath = fs.existsSync(sourceImg1) ? sourceImg1 : fs.existsSync(sourceImg2) ? sourceImg2 : null;

  if (sourcePath) {
    const publicDir = path.resolve(__dirname, 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    fs.copyFileSync(sourcePath, path.resolve(__dirname, 'espacio-luxury-living.jpg'));
    fs.copyFileSync(sourcePath, path.resolve(publicDir, 'espacio-luxury-living.jpg'));
    
    // Also save base64 export for zero-dependency universal fallback
    const buffer = fs.readFileSync(sourcePath);
    const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    const assetsDir = path.resolve(__dirname, 'src/assets');
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
    fs.writeFileSync(path.resolve(assetsDir, 'luxuryBgBase64.ts'), `export const EXACT_LUXURY_BG = ${JSON.stringify(base64)};\n`);
  }
} catch (err) {
  console.warn('Image copy note:', err);
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});

