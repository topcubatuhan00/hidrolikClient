import React, { useEffect, useState } from 'react'
import "./Register.css"
import { Link } from 'react-router-dom';
import genericApiSerice from './../../../Services/genericHttpService';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [currentUserName, setCurrentUserName] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        userName: '',
        email: '',
        password: ''
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (token) {
            const decoded = jwtDecode(token);
            setCurrentUserName(decoded.UserName);
        }
    }, []);

    useEffect(() => {
        const isFormValid = Object.values(formData).every(field => field.length > 0);
        setIsButtonDisabled(!isFormValid);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            name: formData.name,
            lastName: formData.lastName,
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
            role: "User",
            creatorName: currentUserName
        }
        const response = await genericApiSerice.post('/Auth/Register', obj);
        if (response) {
            navigate('/Login');
        }
    };


    return (
        <div className="main">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Kayıt Ol</h2>
                            <form onSubmit={handleSubmit} className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input onChange={handleChange} type="text" name="name" id="name" placeholder="Ad" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input onChange={handleChange} type="text" name="lastName" id="lastName" placeholder="Soyad" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input onChange={handleChange} type="text" name="userName" id="userName" placeholder="Kullanıcı Adı" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input onChange={handleChange} type="email" name="email" id="email" placeholder="Email Adresi" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input onChange={handleChange} type="password" name="password" id="pass" placeholder="Şifre" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit-register" value="Kayıt Ol" disabled={isButtonDisabled} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="https://economixconsulting.com/login/images/signup-image.jpg" alt="sign up" /></figure>
                            <Link to="/Login" className="signup-image-link">
                                Hesabınız Var mı? Giriş Yapınız
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
