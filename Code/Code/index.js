const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { uploadComic } = require('./upload');
const path = require('path');

const app = express();

// Ensure temp folder exists
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// Multer setup
const upload = multer({ dest: tempDir });

// Upload route
app.post('/upload-comic', upload.single('comic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const filePath = req.file.path;
    const fileName = `${Date.now()}_${req.file.originalname}`;

    const url = await uploadComic(filePath, fileName);

    // Delete temp file
    fs.unlinkSync(filePath);

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

// Optional: Redirect to MinIO URL
app.get('/comics/:fileName', (req, res) => {
  const { fileName } = req.params;
  const url = `http://localhost:9000/comics/${fileName}`;
  res.redirect(url);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
