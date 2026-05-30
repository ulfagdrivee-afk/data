import { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

class Home extends Component {
  state = {
    role: ""
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    this.setState({ role });
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  render() {
    const { role } = this.state;

    return (
      <div>
        <div className="navbar">
          <h3 className="logo">Data Nilai</h3>

          <div className="nav-links">

            {/* MENU ADMIN */}
            {role === "admin" && (
            <div className="menu">
                <Link to="/home/mapel">Mapel</Link>
                <Link to="/home/siswa">Siswa</Link>
              </div>
            )}

            {/* MENU GURU */}
            {role === "guru" && (
                          <div className="menu">

                <Link to="/home/nilai">Nilai</Link>
              </div>
            )}

          </div>

          <button className="logout-btn" onClick={this.handleLogout}>
            Logout
          </button>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default Home;