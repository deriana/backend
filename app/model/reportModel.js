const connectDB = require("../config/db");

const getAllReport = async () => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.timestamp BETWEEN DATE(NOW()) AND NOW()
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
};

const getScansByRFID = async (rfid) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        u.rfid = ?
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query, [rfid]);
  await connection.end();
  return rows;
};

const getReportByType = async (option) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        u.name AS Nama,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.type = ?
    ORDER BY 
        s.timestamp, s.type;
  `;

  const [rows] = await connection.execute(query, [option]);
  await connection.end();
  return rows;
};

const getScansByDateRange = async (startDate, endDate) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        DATE(s.timestamp) BETWEEN ? AND ? 
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query, [startDate, endDate]);
  await connection.end();
  return rows;
};

const getReportByDateRangeAndTimeCondition = async (
  startDate,
  endDate,
  timeCondition,
  timeValue
) => {
  const connection = await connectDB();

  const query = `
    SELECT 
        s.id AS No,
        u.name AS Nama,
        u.rfid AS RFID,
        u.kelamin AS Kelamin,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Absensi',
        s.type AS 'Jenis Absensi'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        DATE(s.timestamp) BETWEEN ? AND ? 
        AND DAYOFWEEK(s.timestamp) NOT IN (1, 7)
        AND s.type = 'masuk'
        AND TIME(s.timestamp) ${timeCondition} ?
    ORDER BY 
        s.timestamp DESC;
  `;

  const [rows] = await connection.execute(query, [
    startDate,
    endDate,
    timeValue,
  ]);
  await connection.end();
  return rows;
};

const getLateScans = async () => {
  const connection = await connectDB();

  const query = `
    SELECT 
        u.name AS Nama,
        u.mapel AS 'Mata Pelajaran',
        s.timestamp AS 'Waktu Masuk'
    FROM 
        scans s
    JOIN 
        users u ON s.userID = u.id
    WHERE 
        s.type = 'masuk'
        AND TIME(s.timestamp) > '08:00:00'
    ORDER BY 
        s.timestamp;
  `;

  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
};

module.exports = {
  getAllReport,
  getScansByRFID,
  getReportByType,
  getScansByDateRange,
  getReportByDateRangeAndTimeCondition,
  getLateScans,
};
