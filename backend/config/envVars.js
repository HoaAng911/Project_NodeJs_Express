// Import thư viện dotenv để đọc biến môi trường từ file .env
import dotenv from 'dotenv';

// Tải cấu hình từ file .env vào process.env
dotenv.config();

// Xuất các biến môi trường quan trọng để sử dụng trong ứng dụng
export const ENV_VARS = {
    MONGO_URL: process.env.MONGO_URL, // URL kết nối đến MongoDB
    PORT: process.env.PORT || 5000, // Cổng chạy server, mặc định là 5000 nếu không có trong .env
    JWT_SECRET: process.env.JWT_SECRET, // Khóa bí mật để tạo JWT cho xác thực người dùng
    NODE_ENV: process.env.NODE_ENV, // Môi trường chạy ứng dụng (development, production)
    TMDB_API_KEY: process.env.TMDB_API_KEY // API key để gọi dữ liệu từ TMDB (The Movie Database)
};
