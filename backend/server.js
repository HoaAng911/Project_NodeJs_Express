import express from 'express';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';
import { ENV_VARS } from './config/envVars.js';
import { ConnectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRouter.js';

const app = express();
const PORT = ENV_VARS.PORT;

// Middleware để parse JSON body
app.use(express.json()); // Luôn thêm để tránh lỗi req.body bị undefined
app.use(cookieParser()); // Middleware để parse cookie từ request

// Log khi server nhận request bất kỳ
app.use((req, res, next) => {
    console.log("Request nhận được:", {
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString()
    });
    next();
});

// Routes
app.use("/api/v1/auth", authRoutes); // Route không bảo vệ
app.use("/api/v1/movie", protectRoute, movieRoutes); // Route bảo vệ bởi protectRoute
app.use("/api/v1/tv", protectRoute, tvRoutes); // Route bảo vệ bởi protectRoute
app.use("/api/v1/search", protectRoute, searchRoutes);

// Khởi động server
app.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT);
    ConnectDB()
        .then(() => console.log("Kết nối database thành công"))
        .catch((err) => console.log("Lỗi kết nối database:", err.message));
});