const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');

router.get('/user', userController.getUsers);
router.post('/user/register', userController.registerUser);
router.put('/user/edit', userController.editUser);
router.delete('/user/delete/:rfid', userController.deleteUser);

module.exports = router;
