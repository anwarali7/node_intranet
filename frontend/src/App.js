import './App.css';
import {BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import PageConnexion from './components/pages/PageConnexion';
import HomePage from './components/pages/HomePage';
import ModifyPage from './components/pages/ModifyPage';

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
         <Route path='/' exact element={< HomePage/>} />
           <Route path='/connexion' exact element={<PageConnexion />} />
           <Route path='/modify' exact element={<ModifyPage />} />

         </Routes>
      </Router>
    </div>
  );
}

export default App;
