import React from 'react'
import { useState } from 'react';
import { Link, useNavigate}  from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import './header.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import photo from './imgHeader/profil.jpg'


export default function Header({userData, logOut}) {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);

    function handleClick(){
        setSidebar(sidebar => !sidebar)
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
                    <div className='menuBurger' onClick={ handleClick }>
                        <ListIcon />
                        <p>Liste</p>
                        <ul className={sidebar ? "nav-links-sidebar" : "nav-links"}>
                        <li>
                            <Link to="/collaborateurs" className='link'>collaborateurs</Link>
                        </li>
                     </ul>
                    </div>
                    <div className='deconnect'>
                        <img src={photo} alt="profil" />
                        <LogoutIcon className='logout'/>
                        <p className='button_logout' onClick={() => {logOut(); navigate('/connexion');}}>Deconnexion</p>
                    </div>
                </div>


            </div>
        </header>
    </>
 )
}
