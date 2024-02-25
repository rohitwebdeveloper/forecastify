import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Notfound from './Components/Notfound';
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <>
    <div className="appContainer">
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/*' element={<Notfound/>} />
     </Routes>
    </div>
   
    </>
  )
}

export default App
