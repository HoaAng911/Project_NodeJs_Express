import mongoose from "mongoose";

// Định nghĩa schema cho model User  
const userSchema = mongoose.Schema({
    username: {
        type: String,     // Kiểu dữ liệu chuỗi  
        required: true,   // Bắt buộc phải có  
        unique: true,     // Không được trùng lặp giữa các người dùng  
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,   // Bắt buộc có mật khẩu (sẽ được mã hóa trước khi lưu)  
    },
    image: {
        type: String,      // Đường dẫn ảnh đại diện của người dùng  
        default: ""        // Nếu không có ảnh thì mặc định là chuỗi rỗng  
    },
    searchHistory: {
        type: Array,       // Lưu lịch sử tìm kiếm của người dùng dưới dạng mảng  
        default: []        // Mặc định là một mảng rỗng nếu chưa có dữ liệu  
    }
});

// Tạo model User từ schema trên  
export const User = mongoose.model('User', userSchema);
