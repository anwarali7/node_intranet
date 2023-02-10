import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PageConnexion from './components/pages/PageConnexion';
import PageCollaborateurs from './components/pages/PageCollaborateurs.js';
import { getUserData } from './services/requests';
import HomePage from './components/pages/HomePage';
import ModifyPage from './components/pages/ModifyPage';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token === "") {
      navigate("/connexion");
    } else {
      navigate("/home")
    }
  }, [navigate, token]);

  useEffect(() => {
    if(token === "") {
      setUserData(null);
    } else {
      async function fetchData(token) {
        const data = await getUserData(token);
        setUserData(data.data[0]);
      }
      fetchData(token);
    }
  }, [token]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleLogIn = (t) => {
    setToken(t);
  }

  const handleLogOut = () => {
    setToken("");
  }

  return (
    <div className="App">
      
      <Routes>
        {['/', '/connexion'].map(path => <Route path={path} exact element={<PageConnexion logIn={handleLogIn} />} />)}
        <Route path='/home' exact element={<HomePage token={token} logOut={handleLogOut} userData={userData}/>} />
        <Route path='/collaborateurs' exact element={<PageCollaborateurs token={token} userData={userData} logOut={handleLogOut} />} />
        <Route path='/modify' exact element={<ModifyPage />} />

      </Routes>

    </div>
  );
}

export default App;
