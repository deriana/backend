const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');

router.get('/laporan', reportController.getAllReport)
router.get('/laporan/terlambat', reportController.getLateScans);
router.get('/laporan/date', reportController.getReportByDateRange);
router.get('/laporan/:rfid', reportController.getReportByRFID);
router.get('/laporan/tipe/:option', reportController.getReportByType);
router.get('/laporan/type/date-time', reportController.getReportByDateRangeAndTimeCondition);
module.exports = router;
