import axios from "axios";

export async function logIn(email, password) {
  return await axios({
    method: 'post',
    url: 'http://localhost:8000/api/user/login',
    headers: {
      'Accept': 'application/json',
    },
    data: {
      email,
      password
    }
  })
  .then(res => res)
  .catch(err => console.log(err));
}

export async function getUserData(token) {
  return await axios({
    method: 'get',
    url: 'http://localhost:8000/api/user/',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  .then(res => res)
  .catch(err => console.log(err));
}

export async function getAllUsersData(token) {
  return await axios({
    method: 'get',
    url: 'http://localhost:8000/api/user/all-users',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  .then(res => res)
  .catch(err => console.log(err));
}