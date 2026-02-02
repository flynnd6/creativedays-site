import fs from 'fs';
import path from 'path';

export interface GalleryImage {
  filename: string;
  date: string;
  alt: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');

  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
    return [];
  }

  try {
    const files = fs.readdirSync(galleryDir);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
    );

    const images: GalleryImage[] = imageFiles.map(filename => {
      const filePath = path.join(galleryDir, filename);
      const stats = fs.statSync(filePath);

      const altText = filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      return {
        filename,
        date: stats.mtime.toISOString().split('T')[0],
        alt: altText
      };
    });

    return images.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading gallery images:', error);
    return [];
  }
}