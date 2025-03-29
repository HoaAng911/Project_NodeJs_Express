// Import thư viện Express để tạo router
import express from 'express';

// Import các controller xử lý logic liên quan đến phim
import {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMoviesByCategory
} from '../controllers/movie.controller.js';

// Khởi tạo router từ Express
const router = express.Router();

// Route lấy danh sách phim thịnh hành
router.get("/trending", getTrendingMovie);

// Route lấy danh sách trailer của một bộ phim theo ID
router.get("/:id/trailers", getMovieTrailers);

// Route lấy thông tin chi tiết của một bộ phim theo ID
router.get("/:id/details", getMovieDetails);

// Route lấy danh sách các bộ phim tương tự với một bộ phim theo ID
router.get("/:id/similar", getSimilarMovies);

// Route lấy danh sách phim theo thể loại
router.get("/:category", getMoviesByCategory);

// Xuất router để sử dụng trong server chính
export default router;
