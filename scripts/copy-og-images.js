import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'src/assets';
const PUBLIC_DIR = 'public/og-images';

// Create public/og-images directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Function to copy hero banner images
function copyHeroBannerImages() {
  // Get all directories in assets
  const directories = fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  directories.forEach(dir => {
    const assetDir = path.join(ASSETS_DIR, dir);
    
    // Look for image files in each directory
    const files = fs.readdirSync(assetDir)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

    files.forEach(file => {
      if (file.toLowerCase().includes('hero') || file.toLowerCase().includes('banner') || file.toLowerCase().includes('og')) {
        const sourcePath = path.join(assetDir, file);
        const targetPath = path.join(PUBLIC_DIR, `${dir}-${file}`);

        // Copy the file
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${sourcePath} to ${targetPath}`);
      }
    });
  });
}

copyHeroBannerImages(); 