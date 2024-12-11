const rfcModel = require('../model/rfcModel'); // Mengimpor model untuk akses database

// Fungsi untuk registrasi user
const registerUser = async (req, res) => {
    const { rfid, name } = req.body;

    // Validasi input
    if (!rfid || !name) {
        return res.status(400).json({ message: 'RFID dan nama harus diisi' });
    }

    try {
        // Mengecek apakah RFID sudah terdaftar
        const rows = await rfcModel.checkUserByRFID(rfid);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'RFID sudah terdaftar' });
        }

        // Jika RFID belum terdaftar, insert user baru
        await rfcModel.insertUser(rfid, name);
        res.json({ message: 'Registrasi berhasil!' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Terjadi kesalahan dalam registrasi user.' });
    }
};

// Fungsi untuk login user (scan RFID)
const loginUser = async (req, res) => {
    const { rfid } = req.body;

    // Validasi input
    if (!rfid) {
        return res.status(400).json({ message: 'RFID harus diisi' });
    }

    try {
        // Mengecek apakah RFID terdaftar
        const rows = await rfcModel.checkUserByRFID(rfid);
        if (rows.length > 0) {
            const userID = rows[0].id;
            const name = rows[0].name;

            // Mengecek status scan terakhir user
            const lastScanRows = await rfcModel.getLastScan(userID);
            let scanType = 'masuk';

            // Menentukan jenis scan (masuk/keluar)
            if (lastScanRows.length > 0 && lastScanRows[0].type === 'masuk') {
                scanType = 'keluar';
            }

            // Menyimpan scan terbaru (masuk/keluar)
            await rfcModel.insertScan(userID, scanType);

            // Mengirimkan response ke client
            const message = `Status ${scanType === 'masuk' ? 'berhasil masuk' : 'berhasil keluar'}! Selamat datang, ${name}`;

            res.json({ message, name });
        } else {
            res.status(400).json({ message: 'RFID tidak terdaftar' });
        }
    } catch (err) {
        console.error('Error during user login:', err);
        res.status(500).json({ message: 'Terjadi kesalahan dalam proses login.' });
    }
};

// Fungsi untuk mendapatkan semua user
const getUsers = async (req, res) => {
    try {
        // Mendapatkan daftar user
        const results = await rfcModel.getAllUsers();

        if (results.length === 0) {
            return res.status(404).json({ message: 'Tidak ada data pengguna' });
        }

        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data pengguna.' });
    }
};

// Mengekspor fungsi controller
module.exports = {
    registerUser,
    loginUser,
    getUsers
};
