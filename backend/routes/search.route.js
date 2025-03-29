// Import thư viện Express để tạo router
import express from 'express';
const router = express.Router();

// Import các controller xử lý tìm kiếm
import { 
    searchMovie, 
    searchPerson, 
    searchTv, 
    getSearchHistory, 
    removeItemFromSearchHistory 
} from '../controllers/search.controller.js';

// Route tìm kiếm người nổi tiếng theo từ khóa
router.get("/person/:query", searchPerson);

// Route tìm kiếm phim theo từ khóa
router.get("/movie/:query", searchMovie);

// Route tìm kiếm chương trình TV theo từ khóa
router.get("/tv/:query", searchTv);

// Route lấy lịch sử tìm kiếm của người dùng
router.get("/history", getSearchHistory);

// Route xóa một mục khỏi lịch sử tìm kiếm theo ID
router.delete("/history/:id", removeItemFromSearchHistory);

// Xuất router để sử dụng trong server chính
export default router;
