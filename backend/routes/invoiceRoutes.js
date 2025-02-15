const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { generateInvoices, getInvoicesbyid, getInvoices, updateInvoice } = require('../controllers/invoiceController');

// @route   POST api/invoice/generate
// @desc    Generate invoice
// @access  Public
router.post('/generate', [
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('amount', 'Amount is required and must be a positive number').isFloat({ min: 0.01 }),
    check('deadline', 'Deadline must be a valid date').optional().isDate()
], generateInvoices);

// @route   POST api/invoice/getbyid
// @desc    Get all invoices by hostel
// @access  Public
router.post('/getbyid', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getInvoicesbyid);

// @route   POST api/invoice/student
// @desc    Get all invoices by student
// @access  Public
router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getInvoices);

// @route   POST api/invoice/update
// @desc    Update invoice
// @access  Public
router.post('/update', [
    check('student', 'Student is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    check('amount', 'Amount must be a positive number if provided').optional().isFloat({ min: 0.01 }),
    check('title', 'Title is required').optional(),
    check('deadline', 'Deadline must be a valid date').optional().isDate()
], updateInvoice);

module.exports = router;
