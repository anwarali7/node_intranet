import React from 'react';
import Header from '../home/header/Header'
import './style/modifypage.scss';
import Button from '../button/Button';
import Formulaire from '../formulaire/Formulaire';



function ModifyPage() {
  return (
    <>
        <Header />
        <div className='first_container'>
            <h1>Modifier mon profil</h1>
        </div>
        <Formulaire />
        <Button name="MODIFIER" />
    </>
  )
}

export default ModifyPage