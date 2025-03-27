import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

// Hàm fetchFromTMDB dùng để gửi yêu cầu GET đến TMDB API  
export const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',  // Sử dụng phương thức GET để lấy dữ liệu  
        headers: {
            accept: 'application/json',  // Yêu cầu dữ liệu dưới dạng JSON  
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY // Thêm API Key vào Header để xác thực  
        }
    };

    // Gửi request đến URL đã truyền vào với cấu hình headers
    const response = await axios.get(url, options);

    // Kiểm tra xem phản hồi có thành công không (status code 200)  
    if (response.status !== 200) {
        throw new Error('Failed to fetch data from TMDB' + response.statusText); // Nếu lỗi, ném ra ngoại lệ  
    }

    return response.data; // Trả về dữ liệu từ API  
};  
