import React from 'react';
import './home.scss'
import profil2 from './imgHome/profil2.jpg';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import { Link }  from 'react-router-dom';



export default function Home() {
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
                 <div className='technique'>Technique</div>

                <div className='flex-left'>
                    <img src={profil2} alt="profil"/>
                </div>

                <div className='flex-right'>
                    <p className='name'>Quentin Roger <em>(36 ans)</em></p>
                    <p className='localisation'>Saint-pierre, France</p>
                    <Link className='mail'><em><EmailIcon /></em>quantin@gmail.com</Link>
                    <p className='phone'><em><PhoneIcon /></em>05-65-47-68-46</p>
                    <p className='birthday'><em><CakeIcon /></em>Anniversaire : 11 décmebre</p>
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