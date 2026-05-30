import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Mapel from './Mapel';
import Nilai from './Nilai';
import Siswa from './Siswa';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* HOME PARENT */}
        <Route path='/home' element={<Home />}>
          
          {/* CHILD ROUTES (INI PENTING) */}
          <Route path='siswa' element={<Siswa />} />
          <Route path='mapel' element={<Mapel />} />
          <Route path='nilai' element={<Nilai />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;