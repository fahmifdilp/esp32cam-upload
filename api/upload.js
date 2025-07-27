import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image, filename } = req.body;

    if (!image || !filename) {
      return res.status(400).json({ message: 'Missing image or filename' });
    }

    const buffer = Buffer.from(image, 'base64');
    const filePath = path.join('/tmp', filename);
    fs.writeFileSync(filePath, buffer);

    return res.status(200).json({ message: 'Image received', path: filePath });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
