import { Component } from "react";
import axios from "axios";
import './App.css';

class Register extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", data);
      alert("Register berhasil, silahkan login");
      window.location.href = "/login";
    } catch (err) {
  if (err.response) {
    const res = err.response.data;

    if (res.errors) {
      const messages = Object.values(res.errors).flat().join("\n");
      alert(messages);
    } else {
      alert(res.message || "Register gagal");
    }
  } else {
    alert("Server error");
  }
}
  };

  render() {
    return (
      <div className="auth-container">
        <div className="card">
          <h2 className="title">Register</h2>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" placeholder="Name" className="input" />
            <input type="email" name="email" placeholder="Email" className="input" />
            <input type="password" name="password" placeholder="Password" className="input" />

            {/* ROLE */}
            <select name="role" className="input" defaultValue="user">
              <option value="admin">Admin</option>
              <option value="guru">Guru</option>
            </select>

            <button type="submit" className="btn">Register</button>
          </form>

          <p className="link">
            Sudah Punya Akun <a href="/login">Login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;