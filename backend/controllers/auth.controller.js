import { User } from "../models/user.model.js"; // Nhập mô hình User từ file model
import bcrypt from "bcryptjs"; // Nhập thư viện bcrypt để mã hóa mật khẩu
import { generateTokenAndSetCookie } from "../utils/generateToken.js"; // Nhập hàm tạo token và set cookie

// Hàm xử lý đăng ký người dùng
export async function signup(req, res) {
    try {
        // Lấy dữ liệu từ body của request (email, password, username)
        const { email, password, username } = req.body;

        // Kiểm tra xem các trường có bị thiếu không
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'Tất cả các trường phải được điền đầy đủ' });
        }

        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
        }

        // Kiểm tra độ dài mật khẩu (tối thiểu 6 ký tự)
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu phải từ 6 ký tự trở lên'
            });
        }

        // Kiểm tra xem email đã tồn tại trong database chưa
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email đã được sử dụng. Vui lòng chọn email khác!"
            });
        }

        // Kiểm tra xem username đã tồn tại chưa
        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: "Tên người dùng đã tồn tại. Vui lòng chọn tên khác!"
            });
        }

        // Tạo salt để mã hóa mật khẩu (10 vòng lặp)
        const salt = await bcrypt.genSalt(10);
        // Mã hóa mật khẩu bằng salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Danh sách ảnh đại diện mặc định
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        // Chọn ngẫu nhiên một ảnh đại diện từ danh sách
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // Tạo đối tượng người dùng mới với thông tin đã nhập
        const newUser = new User({
            email,
            password: hashedPassword, // Lưu mật khẩu đã mã hóa
            username,
            image,
        });

        // Lưu người dùng mới vào database
        await newUser.save();

        // Tạo token JWT và set vào cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Trả về phản hồi thành công với thông tin người dùng (ẩn mật khẩu)
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc, // Sao chép toàn bộ thông tin người dùng
                password: "" // Ẩn mật khẩu trước khi gửi về client
            }
        });

    } catch (err) {
        // Ghi log lỗi và trả về phản hồi lỗi server
        console.log('Lỗi trong controller đăng ký:', err.message);
        return res.status(500).json({
            success: false,
            message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!"
        });
    }
}

// Hàm xử lý đăng nhập người dùng
export async function login(req, res) {
    try {
        // Lấy email và password từ body của request
        const { email, password } = req.body;

        // Kiểm tra xem email và password có được cung cấp không
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
        }

        // Tìm người dùng trong database dựa trên email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Thông tin đăng nhập không hợp lệ' });
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Thông tin đăng nhập không hợp lệ' });
        }

        // T  Tạo token JWT và set vào cookie
        generateTokenAndSetCookie(user._id, res);

        // Trả về phản hồi thành công với thông tin người dùng (ẩn mật khẩu)
        res.status(200).json({
            success: true,
            user: {
                ...user._doc, // Sao chép toàn bộ thông tin người dùng
                password: "" // Ẩn mật khẩu trước khi gửi về client
            }
        });

    } catch (error) {
        // Ghi log lỗi và trả về phản hồi lỗi server
        console.log('Lỗi trong controller đăng nhập:', error.message);
        return res.status(500).json({
            success: false,
            message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!"
        });
    }
}

// Hàm xử lý đăng xuất người dùng
export async function logout(req, res) {
    try {
        // Xóa cookie chứa token JWT
        res.clearCookie('jwt-netfilm');
        // Trả về phản hồi thành công
        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công"
        });

    } catch (error) {
        // Ghi log lỗi và trả về phản hồi lỗi server
        console.log('Lỗi trong controller đăng xuất: ', error.message);
        return res.status(500).json({
            success: false,
            message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!"
        });
    }
}