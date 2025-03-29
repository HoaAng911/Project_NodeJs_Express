// Import các module cần thiết
import { fetchFromTMDB } from "../services/tmdb.service.js"; // Dịch vụ gọi API TMDB
import { User } from '../models/user.model.js'; // Model User để lưu lịch sử tìm kiếm

// Hàm tìm kiếm người nổi tiếng (Person) từ TMDB
export async function searchPerson(req, res) {
    const { query } = req.params; // Lấy từ khóa tìm kiếm từ request

    try {
        // Gọi API TMDB để tìm kiếm người nổi tiếng
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        // Nếu không tìm thấy kết quả, trả về mã lỗi 404
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Cập nhật lịch sử tìm kiếm của người dùng trong MongoDB
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, // ID của người nổi tiếng
                    image: response.results[0].profile_path, // Ảnh của người nổi tiếng
                    title: response.results[0].name, // Tên của người nổi tiếng
                    searchType: "person", // Loại tìm kiếm là "person"
                    createdAt: new Date(), // Thời gian tìm kiếm
                }
            }
        });

        // Trả kết quả về client
        res.status(200).json({ success: true, content: response.results });

    } catch (error) {
        // Xử lý lỗi nếu có
        console.log("Error in searchPerson controller: " + error.message);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm tìm kiếm phim (Movie) từ TMDB
export async function searchMovie(req, res) {
    const { query } = req.params; // Lấy từ khóa tìm kiếm từ request

    try {
        // Gọi API TMDB để tìm kiếm phim
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        // Nếu không tìm thấy kết quả, trả về mã lỗi 404
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Cập nhật lịch sử tìm kiếm của người dùng trong MongoDB
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, // ID của phim
                    image: response.results[0].poster_path, // Ảnh poster của phim
                    title: response.results[0].title, // Tên phim
                    searchType: "movie", // Loại tìm kiếm là "movie"
                    createdAt: new Date(), // Thời gian tìm kiếm
                }
            }
        });

        // Trả kết quả về client
        res.status(200).json({ success: true, content: response.results });

    } catch (error) {
        // Xử lý lỗi nếu có
        console.log("Error in searchMovie controller: " + error.message);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm tìm kiếm chương trình TV từ TMDB
export async function searchTv(req, res) {
    const { query } = req.params; // Lấy từ khóa tìm kiếm từ request

    try {
        // Gọi API TMDB để tìm kiếm chương trình TV
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        // Nếu không tìm thấy kết quả, trả về mã lỗi 404
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Cập nhật lịch sử tìm kiếm của người dùng trong MongoDB
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, // ID của chương trình TV
                    image: response.results[0].poster_path, // Ảnh của chương trình TV
                    title: response.results[0].name, // Tên chương trình TV
                    searchType: "tv", // Loại tìm kiếm là "tv"
                    createdAt: new Date(), // Thời gian tìm kiếm
                }
            }
        });

        // Trả kết quả về client
        res.status(200).json({ success: true, content: response.results });

    } catch (error) {
        // Xử lý lỗi nếu có
        console.log("Error in searchTv controller: " + error.message);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm lấy lịch sử tìm kiếm
export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}

// Hàm xóa một mục khỏi lịch sử tìm kiếm
export async function removeItemFromSearchHistory(req, res) {
    const id = parseInt(req.params.id); // Chuyển id sang kiểu số nguyên
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }, // Xóa mục trong lịch sử tìm kiếm
            }
        });

        res.status(200).json({ success: true, message: 'Item removed from search history' });
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory: " + error.message);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau!" });
    }
}
