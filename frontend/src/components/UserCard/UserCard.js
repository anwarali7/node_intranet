import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import './UserCard.scss';

export default function UserCard({
  firstname = "Quentin",
  lastname = "Roger",
  age = 36,
  birthdate = "11 décembre",
  category = "Technique",
  city = "Saint-pierre",
  country = "France",
  email = "quantin@gmail.com",
  phone = "05-65-47-68-46",
  imageUrl = "",
}) {
  return (
    <div className='second-section'>
      <div className='technique'>{category}</div>
      <div className='flex-left'>
        <img src={imageUrl} alt="profil" />
      </div>
      <div className='flex-right'>
        <p className='name'>{firstname} {lastname} <em>({age} ans)</em></p>
        <p className='localisation'>{city}, {country}</p>
        <a className='mail' href="mailto:quantin@gmail.com"><em><EmailIcon /></em>{email}</a>
        <p className='phone'><em><PhoneIcon /></em>{phone}</p>
        <p className='birthday'><em><CakeIcon /></em>Anniversaire : {birthdate}</p>
      </div>
    </div>
  )
}