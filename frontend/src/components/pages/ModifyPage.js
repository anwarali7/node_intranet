import React from 'react';
import Header from '../home/header/Header'
import './style/modifypage.scss';


function ModifyPage() {
  return (
    <>
        <Header />
        <div className='first_container'>
            <h1>Modifier mon profil</h1>
        </div>
        <section className='page_modify'>
          <div className='global_section'>
            <form>
                    <label>
                        <p>* Civilité :</p>
                        <select name="sexe" id="sexe" required="required">
                            <option value="femme">Femme</option>
                            <option value="homme">Homme</option>
                        </select>
                    </label>
                    <label>
                        <p>* Catégorie :</p>
                        <select name="categorie" id="categorie" required="required">
                            <option value="client">Client</option>
                            <option value="collaborteur">Collaborateur</option>
                        </select>
                    </label>
                    <label>
                        <p>* Nom</p>
                        <input type="text" value="Admin" required="required"/>
                    </label>
                    <label>
                        <p>* Prénom</p>
                        <input type="text" value="User" required="required"/>
                    </label>
                    <label>
                        <p>* Email :</p>
                        <input type="text" value="ex: ines@gmail.com" required="required"/>
                    </label>
                    <label>
                        <p>* Mot de passe :</p>
                        <input type="passeword" value="(min. 8caractéres)" required="required"/>
                    </label>
                    <label>
                        <p>* Confirmation :</p>
                        <input type="passeword" value="(min. 8caractéres)" required="required"/>
                    </label>
                    <label>
                        <p>* Téléphone :</p>
                        <input type="text" required="required"/>
                    </label>
                    <label>
                        <p>* Date de naissance :</p>
                        <input type="date" required="required"/>
                    </label>
                    <label>
                        <p>* Ville :</p>
                        <input type="text" required="required"/>
                    </label>
                    <label>
                        <p>* Pays :</p>
                        <input type="text" required="required"/>
                    </label>
                    <label>
                        <p>URL de la photo :</p>
                        <input type="url" name="url" id="url"
                            placeholder="https://example.com"
                            pattern="https://.*" size="30"
                            required />
                    </label>

            </form>
            </div>

          <div className='button_login'>
               <button className='LoginButton'>
                <p>MODIFIER</p>
               </button>
          </div>

        </section>
    </>
  )
}

export default ModifyPage