import React from 'react';
import './home.scss'
import profil2 from './imgHome/profil2.jpg';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import { Link }  from 'react-router-dom';



export default function Home({userData}) {
  console.log(userData);
  return (
    <>
        <section className='home'>
          <div className='first-section'>
            <h1 className='welcome'>Bienvenue sur l'intranet</h1>
            <p className='paragraphe'>La plate-forme de l'entreprise qui vous permet de retrouver tous vos collaborateurs</p>
            <p className='second_para'>Avez-vous dit bonjour à :</p>
          </div>
          <div className='global_section'>
            <div className='second-section'>
                 <div className='technique'>{userData.category}</div>

                <div className='flex-left'>
                    <img src={userData.photo} alt="profil"/>
                </div>

                <div className='flex-right'>
                    <p className='name'>{userData.firstname} {userData.lastname} <em>(36 ans)</em></p>
                    <p className='localisation'>{userData.city}, {userData.country}</p>
                    <Link className='mail'><em><EmailIcon /></em>{userData.email}</Link>
                    <p className='phone'><em><PhoneIcon /></em>{userData.phone}</p>
                    <p className='birthday'><em><CakeIcon /></em>Anniversaire : {userData.birthdate}</p>
                </div>
            </div>
          </div>

          <div className='global_button'>
               <button className='hello_button'>
                <p>DIRE BONJOUR A QUELQU'UN D'AUTRE</p>
               </button>
          </div>

        </section>

    </>
  )
}