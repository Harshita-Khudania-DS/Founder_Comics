const Minio = require('minio');

// Configure the MinIO client
const minioClient = new Minio.Client({
  endPoint: 'localhost',       // MinIO server
  port: 9000,                  // MinIO port
  useSSL: false,               // set true if using SSL
  accessKey: process.env.MINIO_ACCESS_KEY || 'admin',  // use env vars
  secretKey: process.env.MINIO_SECRET_KEY || 'admin123'
});

module.exports = minioClient;
