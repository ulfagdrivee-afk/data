import { Component } from "react";
import axios from "axios";
import "./App.css";

class Siswa extends Component {
 state = {
  data: [],
  nisn: "",
  nama_lengkap: "",
  kelas: "",
  tanggal_lahir: "",
  editId: null,
  showForm: false, 
  errors: {},
};
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/siswa",
    );

    this.setState({ data: res.data.data.siswa });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

 handleSubmit = async (e) => {
  e.preventDefault();
  const { nisn, nama_lengkap, kelas, tanggal_lahir, editId } = this.state;

  try {
    if (editId) {
      await axios.put(
        `http://127.0.0.1:8000/api/siswa/${editId}`,
        {  nisn, nama_lengkap, kelas, tanggal_lahir},
      );

      alert("Update Siswa Successful");

    } else {
      await axios.post(
        "http://127.0.0.1:8000/api/siswa",

        { nisn, nama_lengkap, kelas, tanggal_lahir},
      );

      alert("Create siswa Successful");
    }

    this.setState({
      nisn: "",
      nama_lengkap: "",
      kelas: "",
      tanggal_lahir: "",
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
      nisn: item.nisn,
      nama_lengkap: item.nama_lengkap,
      kelas: item.kelas,
      tanggal_lahir: item.tanggal_lahir,
      editId: item.id,
       showForm: true,
    errors: {}, 
    });
  };

  handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/siswa/${id}`,
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
      <button
        className="add-btn"
        onClick={() => this.setState({ showForm: true })}>
        + Tambah Data
      </button>

      {this.state.showForm && (
        <form onSubmit={this.handleSubmit}>

          <input
            name="nisn"
            placeholder="Nisn"
            value={this.state.nisn}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.nisn && (
            <p className="error">
              {this.state.errors.nisn[0]}
            </p>
          )}

          <input
            name="nama_lengkap"
            placeholder="Nama_lengkap"
            value={this.state.nama_lengkap}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.nama_lengkap && (
            <p className="error">
              {this.state.errors.nama_lengkap[0]}
            </p>
          )}

          <input
            name="kelas"
            placeholder="Kelas"
            value={this.state.kelas}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.kelas && (
            <p className="error">
              {this.state.errors.kelas[0]}
            </p>
          )}

          <input
            name="tanggal_lahir"
            placeholder="Tanggal Lahir"
            value={this.state.tanggal_lahir}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.tanggal_lahir && (
            <p className="error">
              {this.state.errors.tanggal_lahir[0]}
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
                  nisn: "",
                  nama_lengkap: "",
                  kelas: "",
                  tanggal_lahir: "",
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
              <th>Nisn</th>
              <th>Nama lengkap</th>
              <th>Kelas</th>
              <th>Tanggal Lahir</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={item.id}>

                <td>{index + 1}</td>
                <td>{item.nisn}</td>
                <td>{item.nama_lengkap}</td>
                <td>{item.kelas}</td>
                <td>{item.tanggal_lahir}</td>

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
export default Siswa;