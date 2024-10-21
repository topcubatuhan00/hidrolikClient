import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const routing = useRoutes(Themeroutes);

	return (
		<div>
			<div className="dark">
				{routing}
				<ToastContainer
					position="bottom-right"
					autoClose={1500}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>

			</div>
		</div>

	);
};

export default App;
