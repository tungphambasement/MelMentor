import { useContext, useState } from "react"
import { AuthContext } from "../../services/auth.service"

export default function Login() {
    const { login } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
    })
    const [message, setMessage] = useState("");

    function handleDetailChange(e) {
        setUserData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleSignup() {
        const res = login(userData);
        setMessage(res.message);
    }

    return (
        <div className="login-container">
            <div className="form-group">
                <input
                    className="form-field"
                    placeholder='username'
                    name='username'
                    type='username'
                    value={userData.username}
                    onChange={handleDetailChange}>
                </input>
                <label className="form-label">username</label>
            </div>
            <input
                placeholder='username'
                name='username'
                type='username'
                value={userData.username}
                onChange={handleDetailChange} />
            <input
                placeholder='password'
                name='password'
                type='password'
                value={userData.password}
                onChange={handleDetailChange} />
            <button
                onClick={handleSignup}>
                signup
            </button>
            <div>{message}</div>
        </div>
    )
}