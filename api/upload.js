// api/upload.js
import { writeFile } from 'fs/promises';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Batas ukuran gambar
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { image, filename } = req.body;

  if (!image || !filename) {
    return res.status(400).json({ error: 'Missing image or filename' });
  }

  const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');
  const filePath = `./public/${filename}`;

  try {
    await writeFile(filePath, base64Data, 'base64');
    res.status(200).json({ message: 'Image saved', url: `/public/${filename}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save image', detail: err.message });
  }
}
