import UserCard from '../../UserCard/UserCard';
import './Collaborateurs.scss';

/*
TODO: When text input changes (onchange), fire a request .
For select, fire straight away.
 */
export default function Collaborateurs() {
  return (
    <div className="collab">
      <div className="collab__search">
        <input type="text" placeholder="Rechercher..."></input>
        <label>
          Rechercher par :
          <select>
            <option value="name">Nom</option>
            <option value="location">Localisation</option>
          </select>
          <select>
            {/* TODO: iterate over all categories that exist.
            Information needed from server, need http request
            /categories : sends a list of all categories that exist.
           */}
            <option value="Technique">Technique</option>
          </select>
        </label>
      </div>

      <div className="collab__profiles">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  )
}