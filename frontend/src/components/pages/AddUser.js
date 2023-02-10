import Formulaire from '../formulaire/Formulaire'
import Header from '../home/header/Header'
import Button from '../button/Button'

export default function AddUser({userData, token}) {
  return (
    <>
    <Header userData={userData}/>
    <div className='first_container'>
            <h1>Créer un utilisateur</h1>
    </div>
    <Formulaire token={token}/>
    <Button name="AJOUTER"/>

    </>
    
  )
}