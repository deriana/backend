const mysql = require('mysql2/promise');
require('dotenv').config();  // Import dotenv untuk membaca file .env

// Membuat koneksi ke database
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,  // Menggunakan variabel dari .env
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Database Connection Success');
    return connection;
  } catch (err) {
    console.error('Database Connection Error:', err.message);
    throw err;
  }
};

// Mengekspor koneksi agar dapat digunakan di file lain
module.exports = connectDB;
