// Register.js
import React, { useState } from "react";
import axios from "axios";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //const [uid, setUid] = useState(null);
  const [redirectToDropDown, setRedirectToDropDown] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      if (!username || !email || !password) {
        setMessage("Please fill in all fields.");
        return;
      }
      // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      setMessage("Password must be at least 8 characters with at least one uppercase alphabet and a special character (@$!%*?&).");
      return;
    }
      await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });
      //const { uid } = response.data;
      //setUid(uid);
      setMessage("Registration successful!");
      setRedirectToDropDown(true);
    } catch (error) {
      console.error(error.response.data.message);
      //setMessage("Invalid Credentials!");
      if (error.response.data.message.includes("already registered")) {
        setMessage("User is already registered!");
      } else {
        setMessage("Error occurred during registration");
 
      }
 
    }
  };
 
  if (redirectToDropDown) {
    navigate(`/`);
  }
  return (
    <div className="auth-form-container">
      <AuthForm title="Register" handleSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {message && <p>{message}</p>}
      {message === "User is already registered!" && (
      <p>
      Already have an account? <Link to="/">Login</Link>
      </p>
      )}
      </AuthForm>
    </div>
  );
};
export default Register;

 

 

 