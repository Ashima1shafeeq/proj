const { validationResult } = require('express-validator');
const Invoice = require('../models/Invoice');
const Student = require('../models/Student');

// Generate Invoices
exports.generateInvoices = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { hostel, deadline, title, amount } = req.body;

        // Find students in the given hostel
        const students = await Student.find({ hostel });

        if (students.length === 0) {
            return res.status(404).json({ success: false, errors: "No students found for the given hostel." });
        }

        // Generate invoices for all students
        for (let student of students) {
            await Invoice.create({
                student: student._id,
                title,
                amount,
                deadline
            });
        }

        return res.status(200).json({ success: true, message: "Invoices generated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: "Server Error" });
    }
};

// Get Invoices by Hostel
exports.getInvoicesbyid = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { hostel } = req.body;
        const invoices = await Invoice.find().populate('student');
        return res.status(200).json({ success: true, invoices });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: "Server Error" });
    }
};

// Get Invoices by Student
exports.getInvoices = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { student } = req.body;
        const invoices = await Invoice.find({ student });
        return res.status(200).json({ success: true, invoices });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: "Server Error" });
    }
};

// Update Invoice
exports.updateInvoice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { student, status, amount, title, deadline } = req.body;

        const updatedInvoice = await Invoice.findOneAndUpdate(
            { student },
            { status, amount, title, deadline },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ success: false, errors: "Invoice not found." });
        }

        return res.status(200).json({ success: true, message: "Invoice updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: "Server Error" });
    }
};
