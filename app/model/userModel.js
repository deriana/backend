const connectDB = require('../config/db');

const insertUser = async (rfid, name, kelamin, mapel, image) => {
    const connection = await connectDB();

    const query = 'INSERT INTO users (rfid, name, kelamin, mapel, image) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [rfid, name, kelamin, mapel, image]);

    await connection.end();
    return result;
};

const getAllUsers = async () => {
    const connection = await connectDB();
    const query = 'SELECT * FROM users';
    const [results] = await connection.execute(query);
    await connection.end();
    return results;
};

const getUserByID = async (rfid) => {
    const connection = await connectDB();

    const query = 'SELECT * FROM users WHERE rfid = ?';
    const [rows] = await connection.execute(query, [rfid]);

    await connection.end();
    return rows;
};

const editUser = async (rfid, name, kelamin, mapel, image) => {
    const connection = await connectDB();

    const query = `
        UPDATE users 
        SET name = ?, kelamin = ?, mapel = ?, image = ? 
        WHERE rfid = ?`;
    const [result] = await connection.execute(query, [name, kelamin, mapel, image, rfid]);

    await connection.end();
    return result;
};

const deleteUser = async (rfid) => {
    const connection = await connectDB();

    const query = 'DELETE FROM users WHERE rfid = ?';
    const [result] = await connection.execute(query, [rfid]);

    await connection.end();
    return result;
};

module.exports = {
    insertUser,
    getAllUsers,
    getUserByID,
    editUser,
    deleteUser,
};
