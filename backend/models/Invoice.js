const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be greater than 0'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required'],
  },
});

module.exports = mongoose.model('invoice', InvoiceSchema);
