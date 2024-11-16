import { useContext, useState } from "react"
import { AuthContext } from "../../services/auth.service"
import './signup.scss'

export default function SignUp() {
  const {signup} = useContext(AuthContext);
  const [userData,setUserData] = useState({
    username: "",
    password: "",
    email: "",
  })
  const [message, setMessage] = useState("");

  function handleDetailChange(e){
    setUserData((prev)=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  function handleSignup(){
    const res = signup(userData);
    setMessage(res.message);
  }

  return (
    <div className="signup-container">
      <input
        placeholder='username'
        name='username'
        type='username'
        value={userData.username}
        onChange={handleDetailChange}/>
      <input
        placeholder='password'
        name='password'
        type='password'
        value={userData.password}
        onChange={handleDetailChange} />
      <input
        placeholder='email'
        name='email'
        type='email'
        value={userData.email}
        onChange={handleDetailChange} />
      <button
        onClick={handleSignup}>
        signup
      </button>
      <div>{message}</div>
    </div>
  )
}
