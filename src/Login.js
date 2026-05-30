import { Component } from "react";
import axios from "axios";
import "./App.css";
class Login extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      email : form.email.value,
      password : form.password.value,
    };
   try {
  const res = await axios.post("http://127.0.0.1:8000/api/auth/login", data);

  localStorage.setItem("token", res.data.data.token);
  localStorage.setItem("role", res.data.data.role);

  alert("Login berhasil");
  window.location.href = "/home";
} catch (err) {
  if (err.response) {
    const res = err.response.data;

    // ❌ ERROR VALIDASI (422)
    if (res.errors) {
      const messages = Object.values(res.errors)
        .flat()
        .join("\n");

      alert(messages);
    }

    // ❌ ERROR LOGIN (401)
    else if (res.message) {
      alert(res.message);
    }

  } else {
    alert("Server tidak merespon");
  }
}
  };

  render() {
    return (
      <div className="auth-container">
        <div className="card">
          <h2 className="title">Login</h2>
          <form onSubmit={this.handleSubmit} className="form">
            <input type="email" name="email" placeholder="Email" className="input"/>
            <input type="password" name="password" placeholder="Password"className="input"/>
            <button type="submit" className="btn">Login</button>
              <p className="link">Belum Punya Akun <a href="/register">Register</a></p>
          
          </form>
        
        </div>
      </div>
    )
  }
}

export default Login;