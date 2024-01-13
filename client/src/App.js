import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import Navbar from './components/navbar';
import Add from './pages/add';
import Mycryptos from './pages/mycryptos';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/mycryptos' element={<Mycryptos/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
