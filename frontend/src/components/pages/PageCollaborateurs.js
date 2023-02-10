import Header from '../home/header/Header'
import Collaborateurs from '../home/collaborateurs/Collaborateurs.js'

export default function PageCollaborateurs({userData, logOut}) {
  return (
    <>
    <Header logOut={logOut} userData={userData}/>
    <Collaborateurs/>
    </>
    
  )
}