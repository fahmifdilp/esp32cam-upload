export const config = {
  api: {
    bodyParser: false,
  },
};

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const filename = `esp32cam_${Date.now()}.jpg`;
    const savePath = path.join('/tmp', filename);
    fs.writeFileSync(savePath, buffer);

    console.log('📸 Gambar disimpan ke:', savePath);

    return res.status(200).json({ message: 'Gambar diterima', filename });
  } catch (err) {
    console.error('❌ Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
