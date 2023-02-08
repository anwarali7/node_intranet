import './App.css';
import {BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import PageConnexion from './components/pages/PageConnexion';
import HomePage from './components/pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
         <Route path='/' exact element={< HomePage/>} />
           <Route path='/connexion' exact element={<PageConnexion />} />
         </Routes>

      </Router>
    </div>
  );
}

export default App;
