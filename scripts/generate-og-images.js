import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = 'src/assets';
const PUBLIC_DIR = 'public/og-images';
const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;
const MAX_FILE_SIZE = 300 * 1024; // 300KB in bytes

// Create public/og-images directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Function to generate optimized OG images
async function generateOptimizedOGImages() {
  // Get all directories in assets
  const directories = fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dir of directories) {
    const assetDir = path.join(ASSETS_DIR, dir);
    
    // Look for hero banner images specifically
    const files = fs.readdirSync(assetDir)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .filter(file => file.toLowerCase().includes('og'));

    for (const file of files) {
      const sourcePath = path.join(assetDir, file);
      const fileName = path.parse(file).name;
      const targetPath = path.join(PUBLIC_DIR, `${dir}-${fileName}.jpg`); // Always output as JPEG

      try {
        console.log(`Processing ${sourcePath}...`);
        
        // Start with high quality and reduce if needed
        let quality = 95;
        let outputBuffer;
        
        do {
          outputBuffer = await sharp(sourcePath)
            .resize(TARGET_WIDTH, TARGET_HEIGHT, {
              fit: 'cover', // Crop to fill the exact dimensions
              position: 'center'
            })
            .jpeg({ 
              quality: quality,
              progressive: true,
              mozjpeg: true // Use mozjpeg encoder for better compression
            })
            .toBuffer();
          
          // If file is too large, reduce quality
          if (outputBuffer.length > MAX_FILE_SIZE && quality > 60) {
            quality -= 5;
            console.log(`  File size ${Math.round(outputBuffer.length / 1024)}KB too large, reducing quality to ${quality}%`);
          } else {
            break;
          }
        } while (quality >= 60);

        // Write the optimized image
        fs.writeFileSync(targetPath, outputBuffer);
        
        const fileSizeKB = Math.round(outputBuffer.length / 1024);
        console.log(`✅ Generated ${targetPath} (${TARGET_WIDTH}x${TARGET_HEIGHT}, ${fileSizeKB}KB, ${quality}% quality)`);
        
        if (fileSizeKB > 300) {
          console.log(`⚠️  Warning: ${targetPath} is ${fileSizeKB}KB (over 300KB recommended limit)`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${sourcePath}:`, error.message);
      }
    }
  }
}

generateOptimizedOGImages().catch(console.error); 