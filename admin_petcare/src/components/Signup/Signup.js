// src/components/AdminSignup/AdminSignup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Thêm file CSS để tùy chỉnh giao diện

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Thực hiện logic đăng ký ở đây (ví dụ: gọi API)
    // Nếu đăng ký thành công, chuyển hướng tới trang đăng nhập
    navigate("/admin-login");
  };

  return (
    <div className="signup-container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default AdminSignup;
