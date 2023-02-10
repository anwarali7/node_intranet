import React from 'react'
import './formulaire.scss';
import axios from 'axios';

function Formulaire({ token }) {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      console.log("form is valid");
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/user/new-user',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: {
          gender: e.target.gender.value,
          category: e.target.category.value,
          firstname: e.target.firstname.value,
          lastname: e.target.lastname.value,
          email: e.target.email.value,
          password: e.target.password.value,
          phone: e.target.phone.value,
          birthdate: e.target.birthdate.value,
          city: e.target.city.value,
          country: e.target.country.value,
          photo: e.target.photo.value,
        }
      })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    } else {
      console.log("form not valid");
    }
  }

  return (
    <>
      <div className='global_section'>
        <form onSubmit={handleFormSubmit}>
          <label>
            <p>* Civilité :</p>
            <select name="gender" id="sexe" required="required">
              <option value="femme">Femme</option>
              <option value="homme">Homme</option>
            </select>
          </label>
          <label>
            <p>* Catégorie :</p>
            <select name="category" id="categorie" required="required">
              <option value="client">Client</option>
              <option value="collaborteur">Collaborateur</option>
            </select>
          </label>
          <label>
            <p>* Nom</p>
            <input type="text" name="lastname" required="required" />
          </label>
          <label>
            <p>* Prénom</p>
            <input type="text" name="firstname" required="required" />
          </label>
          <label>
            <p>* Email :</p>
            <input type="text" name="email" placeholder="ex: ines@gmail.com" required="required" />
          </label>
          <label>
            <p>* Mot de passe :</p>
            <input type="password" name="password" required="required" />
          </label>
          <label>
            <p>* Confirmation :</p>
            <input type="password" name="passwordVerif" required="required" />
          </label>
          <label>
            <p>* Téléphone :</p>
            <input type="text" name="phone" required="required" />
          </label>
          <label>
            <p>* Date de naissance :</p>
            <input type="date" name="birthdate" required="required" />
          </label>
          <label>
            <p>* Ville :</p>
            <input type="text" name="city" required="required" />
          </label>
          <label>
            <p>* Pays :</p>
            <input type="text" name="country" required="required" />
          </label>
          <label>
            <p>URL de la photo :</p>
            <input type="url" name="photo" id="url"
              placeholder="https://example.com"
              pattern="https://.*" size="30"
              required />
          </label>

          <button type="submit">Ajouter</button>
        </form>
      </div>

    </>
  )
}

export default Formulaire