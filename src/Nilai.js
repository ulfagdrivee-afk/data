import { Component } from "react";
import axios from "axios";
import "./App.css";

class Nilai extends Component {
  state = {
    data: [],
    siswa: [],
    mapel: [],
    siswa_id: "",
    mapel_id: "",
    nilai_tugas: "",
    nilai_uas: "",
    nilai_uts: "",
    nilai_akhir: "",
    kategori: "",
    editId: null,
    showForm: false,
  };

  componentDidMount() {
    this.getData();
    this.getSiswa();
    this.getMapel();
  }

getData = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/nilai",

    );

    this.setState({
      data: res.data.data || [],
    });
  } catch (err) {
    console.log(err);
  }
};

getSiswa = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/siswa",
     
    );
    this.setState({
      siswa: res.data.data.siswa || [],
    });
  } catch (err) {
    console.log(err);
  }
};

  getMapel = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/mapel");
      this.setState({
        mapel: res.data.data.mapel || [],
      });
    } catch (err) {
      console.log(err);
    }
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
 const {
  siswa_id,
  mapel_id,
  nilai_tugas,
  nilai_uts,
  nilai_uas,
  editId
} = this.state;
    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/nilai/${editId}`,
          { siswa_id, mapel_id, nilai_tugas, nilai_uts, nilai_uas },
        );
        alert("Update Nilai Successful");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/nilai",
          {  siswa_id, mapel_id, nilai_tugas, nilai_uts, nilai_uas},
        );
        alert("Create Nilai Successful");
      }

    this.setState({
  siswa_id : "",
  mapel_id: "",
  nilai_tugas: "",
  nilai_uts:"",
  nilai_uas:"",
  nilai_akhir:"",
  kategori:"",
});

      this.getData();
    } catch (err) {
  console.log("ERROR:", err.response?.data);
  alert(JSON.stringify(err.response?.data));
}
  };
 handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/nilai/${id}`,
    
    );

    this.setState({
      data: this.state.data.filter((item) => item.id !== id),
    });

  } catch (err) {
    console.log(err);
  }
};

  handleEdit = (item) => {
    this.setState({
      siswa_id: item.siswa_id,
      mapel_id: item.mapel_id,
      nilai_tugas: item.nilai_tugas,
      nilai_uts: item.nilai_uts,
      nilai_uas: item.nilai_uas,
      nilai_akhir: item.nilai_akhir,
      kategori: item.kategori,
      editId: item.id,
      showForm: true,
    });
  };

  render() {

    return (
      <div className="content">

  <button
    className="add-btn"
onClick={() =>
  this.setState({
    showForm: true,
    editId: null,
    siswa_id: "",
    mapel_id: "",
    nilai_tugas: "",
    nilai_uts: "",
    nilai_uas: "",
  })
}  >
    + Tambah Data
  </button>
    {this.state.showForm && (
          <form onSubmit={this.handleSubmit} className="form">

            <select
              name="siswa_id"
              value={this.state.siswa_id}
              onChange={this.handleChange}
              className="input"
            >
              <option value="">Pilih Nisn</option>
              {this.state.siswa.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nama_lengkap}   
              </option>
            ))}

            </select>
            <select
              name="mapel_id"
              value={this.state.mapel_id}
              onChange={this.handleChange}
              className="input"
            >
              <option value="">Pilih Mapel</option>
          {this.state.mapel.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nama_mapel}   
            </option>
          ))}
            </select>

            <input
            type="number"
              name="nilai_tugas"
              placeholder="Nilai Tugas"
              value={this.state.nilai_tugas}
              onChange={this.handleChange}
              className="input"
            />
            <input
            type="number"
              name="nilai_uts"
              placeholder="Nilai Uts"
              value={this.state.nilai_uts}
              onChange={this.handleChange}
              className="input"
            />
            <input
            type="number"
              name="nilai_uas"
              placeholder="Nilai Uas"
              value={this.state.nilai_uas}
              onChange={this.handleChange}
              className="input"
            />

            <div className="button-group">
              <button className="submit-btn">
                {this.state.editId ? "Update" : "Simpan"}
              </button>

              <button
                type="button"
                className="btn cancel"
                onClick={() => this.setState({ showForm: false })}
              >
                Batal
              </button>
            </div>

          </form>
        )}

        <table className="table-container">
          <thead>
            <tr>
              <th>No</th>
              <th>Siswa</th>
              <th>Mapel</th>
              <th>Nilai Tugas</th>
              <th>NIlai Uts</th>
              <th>Nilai Uas</th>
              <th>Nilai Akhir</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>{item.siswa}</td>
                <td>{item.mapel}</td>

                <td>{item.nilai_tugas}</td>
                <td>{item.nilai_uts}</td>
                <td>{item.nilai_uas}</td>
                <td>{item.nilai_akhir}</td>
                <td>{item.kategori}</td>

              <td>
   
    <>
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
    </>
  
</td>  
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    );
  }
}

export default Nilai;


 