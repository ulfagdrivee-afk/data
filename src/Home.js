import { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

class Home extends Component {
render() {
    return(
      <div>
        <div className="navbar">
          <h3 className="logo">data Nilai</h3>
          <div className="nav-links">
            <Link to="Siswa">Siswa</Link>
            <Link to="Mapel">Mapel</Link>
            <Link to="Nilai">Nilai</Link>
          </div>
        </div>
        <div className="content">
          <Outlet/>
        </div>
      </div>
    )
  }
}


export default Home;