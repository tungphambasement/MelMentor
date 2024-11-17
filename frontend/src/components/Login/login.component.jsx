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

    const [requiredDetails, setRequiredDetails] = useState(["username", "password"]);

    function handleDetailChange(e) {
        setUserData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleLogin() {
        const res = login(userData);
        setMessage(res.message);
    }

    return (
        <div className="login-container">
            {requiredDetails && requiredDetails.map(detail => {
                return (
                    <div className="form-group">
                        <input
                            className="form-field"
                            placeholder={detail}
                            name={detail}
                            type={detail}
                            value={userData[{detail}]}
                            onChange={handleDetailChange}>
                        </input>
                        <label className="form-label">{detail}</label>
                    </div>
                );
            })}
            <button
                onClick={handleLogin}>
                Login
            </button>
            <div>{message}</div>
        </div>
    )
}