// middleware/isAdmin.js
export function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Bạn không có quyền truy cập trang này",
        });
    }
}
