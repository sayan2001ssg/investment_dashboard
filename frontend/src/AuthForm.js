// AuthForm.js
import React from "react";
import './AuthForm.css'; // Import the CSS file

const AuthForm = ({ title, handleSubmit, children }) => {
  return (
      <div className="auth-form">
        <h2>{title}</h2>
        {children}
        {handleSubmit && <button onClick={handleSubmit}>{title}</button>}
      </div>
    
  );
};

export default AuthForm;
