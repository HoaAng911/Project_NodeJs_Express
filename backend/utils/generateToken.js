import jwt from 'jsonwebtoken' // Import thư viện JWT để tạo token
import { ENV_VARS } from '../config/envVars.js' // Import biến môi trường

// Hàm tạo JWT và đặt vào cookie
export const generateTokenAndSetCookie = (userId, res) => {
    // Tạo token chứa userId, ký với JWT_SECRET và có hạn 15 ngày
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" })

    // Đặt token vào cookie phản hồi
    res.cookie('jwt-netfilm', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Thời gian sống của cookie: 15 ngày
        httpOnly: true, // Cookie chỉ có thể truy cập qua HTTP, không thể bị đọc bởi JavaScript
        sameSite: "strict", // Chỉ chấp nhận cookie từ cùng một trang (chống CSRF)
        secure: ENV_VARS.NODE_ENV !== "development" // Chỉ sử dụng HTTPS nếu không phải môi trường dev
    })

    return token // Trả về token để sử dụng nếu cần
}
