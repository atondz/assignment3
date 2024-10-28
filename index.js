
require('dotenv').config(); // Đảm bảo dotenv được gọi đầu tiên

const express = require('express');
const connectDB = require('./db'); // Import file kết nối MongoDB
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());

// Kiểm tra giá trị của biến môi trường
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Kết nối MongoDB
connectDB();

// Define routes
app.get('/info', (req, res) => {
  res.json({
    data: {
      fullName: "Lam Ba Luan",
      studentCode: "QNUO1234",
    },
  });
});

// Sử dụng routes cho các API student
app.use('/students', studentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
