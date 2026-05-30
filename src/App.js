import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mapel from './Mapel';
import Nilai from './Nilai';
import Siswa from './Siswa';
import Home from './Home';
import Register from './Register';
import Login from './Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
    <Route path='/home/siswa' element={<Siswa/>}/>
    <Route path='/home/nilai' element={<Nilai/>}/>
    <Route path='/home/mapel' element={<Mapel/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/' element={<Register/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
     </Routes>
      </BrowserRouter>
    
    </div>

    

  );
}

export default App;
