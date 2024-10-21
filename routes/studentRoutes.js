const express = require('express');
const router = express.Router();
const StudentModel = require('../models/studentModel');  // Đổi từ Student thành StudentModel

// Create a Student
router.post('/', async (req, res) => {
  try {
    const { name, studentCode, isActive } = req.body;

    // Tạo sinh viên mới với 'fullName' thay vì 'name'
    const newStudent = new StudentModel({
      fullName: name, // Ánh xạ 'name' thành 'fullName' trong DB
      studentCode,
      isActive,
    });
    
    const savedStudent = await newStudent.save();

    // Trả về response với 'name' thay vì 'fullName'
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: {
        _id: savedStudent._id,
        name: savedStudent.fullName, // Trả về 'name'
        studentCode: savedStudent.studentCode,
        isActive: savedStudent.isActive,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json({
      success: true,
      data: students.map(student => ({
        _id: student._id,
        name: student.fullName, // Trả về 'name' thay vì 'fullName'
        studentCode: student.studentCode,
        isActive: student.isActive,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get a Student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);  
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a Student
router.put('/:id', async (req, res) => {
  try {
    const { name, isActive } = req.body;

    // Ánh xạ 'name' vào 'fullName'
    const updatedData = {
      fullName: name, // Chuyển từ 'name' sang 'fullName'
      isActive,
    };

    // Cập nhật sinh viên với dữ liệu đã được ánh xạ
    const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id, updatedData, {  
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Trả về dữ liệu với 'name' thay vì 'fullName'
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: {
        _id: updatedStudent._id,
        name: updatedStudent.fullName, // Trả về 'name'
        studentCode: updatedStudent.studentCode,
        isActive: updatedStudent.isActive,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete a Student
// Delete a Student
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);  
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
