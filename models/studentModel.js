const mongoose = require('mongoose');

// Định nghĩa schema cho Student
const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  studentCode: {
    type: String,
    required: [true, 'Student code is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, 'isActive status is required'],
  },
});

module.exports = mongoose.model('StudentModel', studentSchema);
