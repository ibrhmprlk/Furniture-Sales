import dotenv from 'dotenv';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';


import { PORT, mongoDBURL } from './config.js';
import webRoute from './routes/webRoute.js';


dotenv.config();

const app = express();

app.use(
  cors()
);
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use('/web1', webRoute);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}


// MongoDB bağlantısı ve sunucunun başlatılması
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('✅ MongoDB bağlantısı başarılı');
 app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Server port ${PORT} üzerinden çalışıyor');
});
  })
  .catch((error) => {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
  });