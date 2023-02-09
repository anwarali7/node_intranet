import React from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import '../home/header/header.scss'
import LoginIcon from '@mui/icons-material/Logout';
import './style/pageconnexion.scss';

function PageConnexion() {

return(
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
                        <LoginIcon className='logout'/>
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
            <form>
                    <label>
                        <p>Email :</p>
                        <input type="text" value="ex: ines@gmail.com" />
                    </label>

                    <label>
                        <p>Mot de passe :</p>
                        <input type="passeword" />
                    </label>
            </form>
            </div>

          <div className='button_login'>
               <button className='LoginButton'>
                <p>CONNEXION</p>
               </button>
          </div>

        </section>

    </>
)
}

export default PageConnexion