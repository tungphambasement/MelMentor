import { useContext, useState } from "react"
import { AuthContext } from "../../services/auth.service"
import './login.scss'
export default function Login() {
    const { login } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
    })
    const [message, setMessage] = useState("");

    const currentLink = window.location.origin;
    const [requiredDetails, setRequiredDetails] = useState(["username", "password"]);

    function handleDetailChange(e) {
        setUserData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleLogin = async() => {
        const res = await login(userData);
        console.log(res);
        if(!res.jwtToken) setMessage(res);
        else{
            window.location.href = window.location.origin + "/"
        }
    }

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <div className="login-header">
                    Login to Your Account
                </div>
                {requiredDetails && requiredDetails.map(detail => {
                    return (
                        <div className="form-group">
                            <input
                                className="form-field"
                                placeholder={capitalizeFirstLetter(detail)}
                                name={detail}
                                type={detail}
                                value={userData[{ detail }]}
                                onChange={handleDetailChange}>
                            </input>
                            <label className="form-label">{capitalizeFirstLetter(detail)}</label>
                        </div>
                    );
                })}
                <button className="btn-login"
                    onClick={handleLogin}>
                    Login
                </button>
                <div className="message">{message}</div>
                <div className="sign-up">
                    Don't have an account yet? <a href={currentLink+"/signup"}>Sign Up</a>
                </div>
            </div>
        </div>
    )
}