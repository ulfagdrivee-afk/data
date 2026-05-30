import { Component } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

class Mapel extends Component {
 state = {
  data: [],
  nama_mapel: "",
  editId: null,
  showForm: false, 
  errors: {},
};
  componentDidMount() {
 

  this.getData();
}

  getData = async () => {
        const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://127.0.0.1:8000/api/mapel",
       {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ data: res.data.data.mapel });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

 handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const { nama_mapel, editId } = this.state;

  try {
    if (editId) {
      await axios.put(
        `http://127.0.0.1:8000/api/mapel/${editId}`,
        {  nama_mapel},
         { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Update Mapel Successful");

    } else {
      await axios.post(
        "http://127.0.0.1:8000/api/mapel",
        { nama_mapel},
         { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Create mapel Successful");
    }

    this.setState({
      nama_mapel: "",
      editId: null,
      showForm: false,
      errors: {},
    });

    this.getData();

  } catch (err) {
    console.log(err.response.data);

    this.setState({
      errors: err.response?.data?.errors || {},
    });
  }
};

  handleEdit = (item) => {
    this.setState({
      nama_mapel: item.nama_mapel,
      editId: item.id,
       showForm: true,
    errors: {}, 
    });
  };

  handleDelete = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/mapel/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
     alert("Delete mapel Successful");
    this.setState({
      data: this.state.data.filter((item) => item.id !== id),
    });

  } catch (err) {
    console.log(err);
  }
};

 render() {

  return (
    <div className="content">
      <div className="top-actions">
  <Link to="/home" className="home-btn">
   Home
  </Link>

  <button
    className="add-btn"
    onClick={() => this.setState({ showForm: true })}
  >
    + Tambah Data
  </button>
</div>

      {this.state.showForm && (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
      <label>Nama Mapel</label>
          <input
            name="nama_mapel"
            placeholder="Nama Mapel"
            value={this.state.nama_mapel}
            onChange={this.handleChange}
            className="input"
          />
          </div>

          {this.state.errors.nama_mapel && (
            <p className="error">
              {this.state.errors.nama_mapel[0]}
            </p>
          )}

          <div className="button-group">

            <button className="submit-btn">
              {this.state.editId ? "Update" : "Simpan"}
            </button>

            <button
              type="button"
              className="btn"
              onClick={() =>
                this.setState({
                  showForm: false,
                  nama_mapel: "",
                  editId: null,
                })
              }
            >
              Batal
            </button>

          </div>

        </form>
      )}

      <div className="table-container">
        <table>

          <thead>
            <tr>
              <th>No</th>
              <th>Nama Mapel</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={item.id}>

                <td>{index + 1}</td>
                <td>{item.nama_mapel}</td>
               

                <td>

                  <button
                    className="action-btn edit"
                    onClick={() => this.handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    Hapus
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
}
export default Mapel;