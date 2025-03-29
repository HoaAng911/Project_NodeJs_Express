// Import thư viện Express để tạo router
import express from 'express';

// Import các controller xử lý xác thực người dùng
import { login, logout, signup } from '../controllers/auth.controller.js';

// Khởi tạo router từ Express
const router = express.Router();

// Route đăng ký tài khoản mới
router.post("/signup", signup);

// Route đăng nhập người dùng
router.post("/login", login);

// Route đăng xuất người dùng
router.post("/logout", logout);

// Xuất router để sử dụng trong server chính
export default router;
