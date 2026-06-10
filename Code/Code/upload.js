const minioClient = require('./minioClient');
const fs = require('fs');
const path = require('path');

async function uploadComic(filePath, fileName) {
  const bucketName = 'comics';

  // Ensure bucket exists
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
    console.log(`Bucket ${bucketName} created!`);
  }

  // Upload file using Promise to work with async/await
  await new Promise((resolve, reject) => {
    minioClient.fPutObject(bucketName, fileName, filePath, {}, (err, etag) => {
      if (err) return reject(err);
      console.log(`File uploaded successfully: ${fileName}`);
      resolve();
    });
  });

  // Return public URL
  return `http://localhost:9000/${bucketName}/${fileName}`;
}

module.exports = { uploadComic };
