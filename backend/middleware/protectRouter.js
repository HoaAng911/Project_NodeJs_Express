import jwt from "jsonwebtoken"; // Import thư viện JSON Web Token để xử lý token
import { User } from "../models/user.model.js"; // Import model User từ file user.model.js
import { ENV_VARS } from "../config/envVars.js"; // Import các biến môi trường từ file envVars.js

// Hàm middleware để bảo vệ route, kiểm tra xác thực người dùng
export const protectRoute = async (req, res, next) => {
    try {
        // Lấy token từ cookie có tên "jwt-netfilm" trong request
        const token = req.cookies["jwt-netfilm"];

        // Kiểm tra xem token có tồn tại không
        if (!token) {
            // Nếu không có token, trả về lỗi 401 với thông báo
            return res.status(401).json({ success: false, message: "Unauthorized - No token Provided" });
        }

        // Giải mã token sử dụng JWT_SECRET từ biến môi trường
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        // Kiểm tra xem token có hợp lệ không (dù điều kiện này không cần vì jwt.verify sẽ throw error nếu token sai)
        if (!decoded) {
            // Nếu token không hợp lệ, trả về lỗi 401 với thông báo
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        // Tìm user trong database dựa trên userId từ token, loại bỏ trường password khỏi kết quả
        const user = await User.findById(decoded.userId).select("-password");

        // Kiểm tra xem user có tồn tại trong database không
        if (!user) {
            // Nếu không tìm thấy user, trả về lỗi 404 với thông báo
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Gắn thông tin user vào đối tượng req để sử dụng ở các middleware hoặc route tiếp theo
        req.user = user;

        // Chuyển tiếp request sang middleware hoặc route handler tiếp theo
        next();
    } catch (error) {
        // Ghi log lỗi ra console để debug
        console.log("Error in protectRoute middleware: ", error.message);

        // Trả về lỗi 500 với thông báo khi có lỗi xảy ra
        res.status(500).json({ success: false, message: "Loi server" });
    }
};