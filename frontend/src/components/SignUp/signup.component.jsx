import { useContext, useState } from "react";
import { AuthContext } from "../../services/auth.service";
import './signup.scss'; // Custom styles for the signup page

export default function SignUp() {
  const { signup } = useContext(AuthContext); // Use context to call the signup function
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState(""); // For showing feedback messages

  // Handle input change
  function handleDetailChange(e) {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value, // Update state dynamically based on the input's name
      };
    });
  }

  const origin = window.location.origin;
  
  // Handle form submission
  function handleSignup(e) {
    e.preventDefault(); // Prevent default form submission behavior
    const res = signup(userData); // Call signup function from context
    if(res && res.username){
      window.location.href = origin;
    }
    setMessage(res.message); // Set the feedback message
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>
        
        <form onSubmit={handleSignup}>
          {/* Username Input */}
          <input
            placeholder="Username"
            name="username"
            type="text"
            value={userData.username}
            onChange={handleDetailChange}
            required
          />

          {/* Password Input */}
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleDetailChange}
            required
          />

          {/* Email Input */}
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleDetailChange}
            required
          />

          {/* Submit Button */}
          <button type="submit" className="signup-btn" href={origin}>Sign Up</button>
        </form>

        {/* Display feedback message */}
        <div className="message">{message}</div>

        <p className="login-link">
          Already have an account?{" "}
          <a href="/login" className="login">Login here</a>
        </p>
      </div>
    </div>
  );
}
