const mongoose = require('mongoose');

// Hàm kết nối MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Đảm bảo biến môi trường đã được lấy
    console.log("MongoDB URI:", process.env.MONGODB_URI);

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Dừng ứng dụng nếu kết nối thất bại
  }
};

module.exports = connectDB;
