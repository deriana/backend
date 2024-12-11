const userModel = require('../model/userModel');
const { successResponse, errorResponse } = require('../providers/response');

const registerUser = async (req, res) => {
    const { rfid, name, kelamin, mapel, image } = req.body;

    if (!rfid || !name || !kelamin || !mapel || !image) {
        return res.status(400).json({ message: "Data tidak boleh kosong" });
    }

    try {
        const rows = await userModel.getUserByID(rfid);
        if (rows.length > 0) {
            return res.status(400).json({ message: "RFID sudah terdaftar, coba ID yang lain." });
        }

        const result = await userModel.insertUser(rfid, name, kelamin, mapel, image);
        const allUsers = await userModel.getAllUsers();
        return res.status(200).json({ message: "DONE BOS KU", users: allUsers, userInserted: result });
    } catch (error) {
        console.error('Error registering user:', error); // Debug log
        return res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const results = await userModel.getAllUsers();
        const response = successResponse({ data: results, message: 'Fetching all users success' });
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching users:', error); // Debug log
        const response = errorResponse({ message: error.message });
        return res.status(500).json(response);
    }
};

// Endpoint untuk mengedit pengguna
const editUser = async (req, res) => {
    const { rfid, name, kelamin, mapel, image } = req.body;

    if (!rfid || !name || !kelamin || !mapel || !image) {
        return res.status(400).json({ message: "Data tidak boleh kosong" });
    }

    try {
        // Memeriksa apakah user dengan RFID tersebut ada
        const user = await userModel.getUserByID(rfid);
        if (user.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Mengedit data pengguna
        const result = await userModel.editUser(rfid, name, kelamin, mapel, image);
        return res.status(200).json({ message: "User berhasil diubah", result });
    } catch (error) {
        console.error('Error editing user:', error); // Debug log
        return res.status(500).json({ message: error.message });
    }
};

// Endpoint untuk menghapus pengguna
const deleteUser = async (req, res) => {
    const { rfid } = req.params;

    if (!rfid) {
        return res.status(400).json({ message: "RFID tidak boleh kosong" });
    }

    try {
        // Memeriksa apakah user dengan RFID tersebut ada
        const user = await userModel.getUserByID(rfid);
        if (user.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Menghapus data pengguna
        const result = await userModel.deleteUser(rfid);
        return res.status(200).json({ message: "User berhasil dihapus", result });
    } catch (error) {
        console.error('Error deleting user:', error); // Debug log
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    getUsers,
    editUser,
    deleteUser
};
