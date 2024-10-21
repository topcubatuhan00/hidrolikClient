import React, {useState} from 'react'
import "./Login.css"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import genericApiSerice from './../../../Services/genericHttpService';

export default function Login() {

    const [formData, setFormData] = useState({
		userName: '',
		password: ''
	});
    const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const obj = {
			userName: formData.userName,
			password: formData.password
		}
		const response = await genericApiSerice.post('/Auth/Login', obj)
		localStorage.setItem("Token", response.token);
		const decoded = jwtDecode(response.token);
		localStorage.setItem("Role", decoded.Role)
		navigate("/")
	};


    return (
        <div className="main">
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src="https://masisthr.com/assets/img/signin-image.jpg" alt="sing in" /></figure>
                            <Link to="/Register" className="signup-image-link">
                                Hesabınız Yok mu? Kayıt olun
                            </Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Giris Yap</h2>
                            <form className="register-form" id="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input onChange={handleChange} type="text" name="userName" id="your_name" placeholder="Kullanıcı Adı" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input onChange={handleChange} type="password" name="password" id="your_pass" placeholder="Sifre" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Giris Yap" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
