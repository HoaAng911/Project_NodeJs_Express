// Import mongoose để kết nối với MongoDB
import mongoose from "mongoose";

// Import biến môi trường
import { ENV_VARS } from "./envVars.js";

// Hàm kết nối tới MongoDB
export const ConnectDB = async () => {
    try {
        // Kết nối đến MongoDB bằng URL từ biến môi trường
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL);

        // In ra thông báo khi kết nối thành công
        console.log("MongoDB connected: " + conn.connection.host);
    } catch (err) {
        // In ra lỗi nếu kết nối thất bại
        console.error("Error connecting to MongoDB: " + err.message);

        // Thoát tiến trình với mã lỗi 1
        process.exit(1);
    }
};
