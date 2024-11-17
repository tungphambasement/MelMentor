import { useContext, useState } from "react"

export default function Profile(){
    const [requiredDetails, setRequiredDetails] = useState(["selfImages", "seniority", "description", "experiences", "major1", "major2"]);

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

    function handleSubmit() {
        const res = login(userData);
        setMessage(res.message);
    }

    return (
        <div className="profile-container">
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
                onClick={handleSubmit}>
                Apply Changes
            </button>
            <div>{message}</div>
        </div>
    );
}