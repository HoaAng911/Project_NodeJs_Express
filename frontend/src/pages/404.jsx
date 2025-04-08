import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white'
			style={{ backgroundImage: `url('/404.png')` }} // Thiết lập hình nền cho trang 404
		>
			<header className='absolute top-0 left-0 p-4 bg-black w-full '>
				<Link to={"/"}> {/* Link đến trang chủ */}
					<img src='/netflix-logo.png' alt='Netflix' className='h-8' /> {/* Logo Netflix */}
				</Link>
			</header>
			<main className='text-center error-page--content z-10'>
				<h1 className='text-7xl font-semibold mb-4'>Bạn đã lạc đường?</h1> {/* Tiêu đề lớn cho trang 404 */}
				<p className='mb-6 text-xl'>
					Rất tiếc, chúng tôi không thể tìm thấy trang này. Bạn có thể tìm thấy rất nhiều thứ thú vị trên trang chủ.
				</p>
				<Link to={"/"} className='bg-white text-black py-2 px-4 rounded'>
					Trang Chủ Netflix {/* Nút quay lại trang chủ */}
				</Link>
			</main>
		</div>
	);
};

export default NotFoundPage;
