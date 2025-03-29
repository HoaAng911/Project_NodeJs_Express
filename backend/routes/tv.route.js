// Import thư viện Express để tạo router
import express from 'express';

// Import các controller xử lý logic liên quan đến TV Shows
import { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategory } from '../controllers/tv.controller.js';

// Khởi tạo router từ Express
const router = express.Router();

// Route lấy danh sách TV Show đang thịnh hành
router.get("/trending", getTrendingTv);

// Route lấy danh sách trailer của một TV Show theo ID
router.get("/:id/trailers", getTvTrailers);

// Route lấy thông tin chi tiết của một TV Show theo ID
router.get("/:id/details", getTvDetails);

// Route lấy danh sách các TV Show tương tự với một TV Show theo ID
router.get("/:id/similar", getSimilarTvs);

// Route lấy danh sách TV Show theo thể loại
router.get("/:category", getTvsByCategory);

// Xuất router để sử dụng trong server chính
export default router;
