const express = require('express');
const router = express.Router();
const StudentModel = require('../models/StudentModel');  // Đổi từ Student thành StudentModel

// Create a Student
router.post('/', async (req, res) => {
  try {
    const newStudent = new StudentModel(req.body);  
    const savedStudent = await newStudent.save();
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: savedStudent,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await StudentModel.find();  
    res.status(200).json({ success: true, data: students });
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
    const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id, req.body, {  
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

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
