import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
	// Khai báo state để lưu email và mật khẩu
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Lấy các hàm từ store authUser để xử lý đăng nhập
	const { login, isLoggingIn } = useAuthStore();

	// Hàm xử lý đăng nhập khi người dùng submit form
	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password }); // Gọi hàm login với email và password người dùng nhập
	};

	return (
		<div className='h-screen w-full hero-bg'>
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}>
					<img src='/netflix-logo.png' alt='logo' className='w-52' /> {/* Logo Netflix */}
				</Link>
			</header>

			{/* Phần chính của trang đăng nhập */}
			<div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1> {/* Tiêu đề đăng nhập */}

					<form className='space-y-4' onSubmit={handleLogin}>
						<div>
							<label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='email@example.com' /* Placeholder cho email */
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)} /* Cập nhật giá trị email */
							/>
						</div>

						<div>
							<label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='••••••••' /* Placeholder cho mật khẩu */
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)} /* Cập nhật giá trị mật khẩu */
							/>
						</div>

						{/* Nút đăng nhập */}
						<button
							className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						'
							disabled={isLoggingIn} // Vô hiệu hóa nút khi đang đăng nhập
						>
							{isLoggingIn ? "Loading..." : "Sign In"} {/* Hiển thị trạng thái nếu đang đăng nhập */}
						</button>
					</form>
					<div className='text-center text-gray-400'>
					Don't have an account?{" "}
						<Link to={"/signup"} className='text-red-500 hover:underline'>
						Sign Up
						</Link> {/* Liên kết đăng ký nếu chưa có tài khoản */}
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
