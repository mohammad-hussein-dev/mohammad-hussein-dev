import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const distPath = path.join(__dirname, 'dist');
const rootPath = __dirname;

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Serve Resume folder specifically
  app.use('/Resume', express.static(path.join(__dirname, 'Resume')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.use(express.static(rootPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
