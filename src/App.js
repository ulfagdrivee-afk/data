// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mapel from './Mapel';
import Nilai from './Nilai';
import Siswa from './Siswa';
import Home from './Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
    <Route path='/siswa' element={<Siswa/>}/>
    <Route path='/nilai' element={<Nilai/>}/>
    <Route path='/mapel' element={<Mapel/>}/>
    <Route path='/' element={<Home/>}/>
     </Routes>
      </BrowserRouter>
    
    </div>

    

  );
}

export default App;
