import React, { useState } from "react";
import axios from "axios";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./AuthPage.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState(null);
  const [redirectToInvestmentView, setRedirectToInvestmentView] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const { token, uid } = response.data;
      localStorage.setItem("token", token);
      //alert(uid);
      setUid(uid);
      setMessage("Login successful!"+uid);
      setRedirectToInvestmentView(true); // Set the state to true for redirection
    } catch (error) {
      console.error(error.response.data.message);
      setMessage("Invalid credentials");
    }
  };
  // Perform programmatic navigation when redirectToInvestmentView is true
  if (redirectToInvestmentView) {
    navigate(`/investment-view/${uid}`);
  }
  return (
    <div className="auth-page-container">
      <div className="auth-form-container">
        <AuthForm title="Login" handleSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <p>{message}</p>}
          <p>
            Don't have an account? <Link to="/register">Create!</Link>
          </p>
        </AuthForm>
      </div>
    </div>
  );
};

export default Login;