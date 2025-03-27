import { fetchFromTMDB } from '../services/tmdb.service.js'

// Hàm lấy phim đang thịnh hành
export async function getTrendingTv(req, res) {
    try {
        // Gọi API từ TMDB để lấy danh sách phim thịnh hành trong ngày
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        // Chọn ngẫu nhiên một bộ phim từ danh sách kết quả
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        // Trả về phản hồi JSON với trạng thái thành công và dữ liệu phim ngẫu nhiên
        res.json({ success: true, content: randomMovie });
    } catch (error) {
        // Xử lý lỗi nếu có, trả về mã trạng thái 500 và thông báo lỗi
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm lấy danh sách trailer của một phim theo ID
export async function getTvTrailers(req, res) {
    const { id } = req.params; // Lấy ID phim từ tham số yêu cầu
    try {
        // Gọi API để lấy danh sách video (trailer) của phim dựa trên ID
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        // Trả về phản hồi JSON với trạng thái thành công và danh sách trailer
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        // Kiểm tra nếu lỗi là 404 (không tìm thấy tài nguyên)
        if (error.message.includes("404")) { // Sửa "include" thành "includes"
            return res.status(404).send(null); // Trả về mã 404 và null nếu không tìm thấy
        }
        // Xử lý lỗi khác, trả về mã 500 và thông báo lỗi
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm lấy chi tiết của một phim theo ID
export async function getTvDetails(req, res) {
    const { id } = req.params; // Lấy ID phim từ tham số yêu cầu
    try {
        // Gọi API để lấy thông tin chi tiết của phim dựa trên ID
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        // Trả về phản hồi JSON với trạng thái thành công và dữ liệu chi tiết phim
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        // Kiểm tra nếu lỗi là 404 (không tìm thấy tài nguyên)
        if (error.message.includes("404")) { // Sửa "include" thành "includes"
            return res.status(404).send(null); // Trả về mã 404 và null nếu không tìm thấy
        }
        // Xử lý lỗi khác, trả về mã 500 và thông báo lỗi
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm lấy danh sách phim tương tự theo ID
export async function getSimilarTvs(req, res) {
    const { id } = req.params; // Lấy ID phim từ tham số yêu cầu
    try {
        // Gọi API để lấy danh sách phim tương tự dựa trên ID, trang 1
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        // Trả về phản hồi JSON với trạng thái thành công và danh sách phim tương tự
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        // Xử lý lỗi nếu có, trả về mã trạng thái 500 và thông báo lỗi
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm lấy danh sách phim theo danh mục (category)
export async function getTvsByCategory(req, res) {
    const { category } = req.params; // Lấy danh mục từ tham số yêu cầu
    try {
        // Gọi API để lấy danh sách phim theo danh mục, trang 1
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        // Trả về phản hồi JSON với trạng thái thành công và danh sách phim
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        // Xử lý lỗi nếu có, trả về mã trạng thái 500 và thông báo lỗi
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}