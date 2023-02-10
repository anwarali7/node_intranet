import React from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import '../home/header/header.scss'
import LoginIcon from '@mui/icons-material/Logout';
import './pageconnexion.scss';
import * as req from "../../services/requests.js";

function PageConnexion({
  logIn
}) {

  const submitAndGetData = (email, password) => {
    async function fetchData() {
      const reqdata = await req.logIn(email, password);
      console.log(reqdata);
      if (!(reqdata.data.token == null)) {
        logIn(reqdata.data.token);
      } else {
        window.alert(reqdata.data.errors.message);
        console.error("Login error.");
      }
    };
    fetchData();
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      console.log("form is valid");
      submitAndGetData(e.target.email.value, e.target.password.value);
    } else {
      console.log("form not valid");
    }
  }

  return (
    <>
      <header className='header'>
        <div className='container flex'>
          <div className='container_logo'>
            <div className='logo'>
              <ConnectWithoutContactIcon />
            </div>
            <p className='title'>Intranet</p>
          </div>

          <div className='nav'>
            <div className='deconnect'>
              <LoginIcon className='logout' />
              <p className='button_logout'>Connexion</p>
            </div>
          </div>


        </div>
      </header>
      <section className='page_connexion'>
        <div className='first-section'>
          <h1 className='connexion'>Connexion</h1>
          <p className='paragraphe'>Pour vous connecter à l'intranet, entrez votre idantifiant et mot de passe</p>
        </div>
        <div className='global_section'>
          <form onSubmit={handleFormSubmit}>
            <label>
              <p>Email :</p>
              <input type="email" name="email" required placeholder="ex: ines@gmail.com" />
            </label>

            <label>
              <p>Mot de passe :</p>
              <input type="password" name="password" required />
            </label>

            <div className='button_login'>
              <button className='LoginButton'>
                <p>CONNEXION</p>
              </button>
            </div>
          </form>
        </div>



      </section>

    </>
  )
}

export default PageConnexion