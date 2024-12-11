const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/admin', adminController.getAllAdmin);
router.post('/admin/register', adminController.insertAdmin);
router.post('/admin/login', adminController.loginAdmin);
router.put('/admin/edit/:id', adminController.editAdmin);
router.delete('/admin/delete/:id', adminController.deleteAdmin);
module.exports = router;
