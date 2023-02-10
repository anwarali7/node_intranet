import Formulaire from '../formulaire/Formulaire'
import Header from '../home/header/Header'
import Button from '../button/Button'

export default function AddUser() {
  return (
    <>
    <Header/>
    <div className='first_container'>
            <h1>Créer un utilisateur</h1>
    </div>
    <Formulaire />
    <Button name="AJOUTER"/>

    </>
    
  )
}