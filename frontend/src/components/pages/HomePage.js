import React from 'react'
import Header from '../home/header/Header'
import Home from '../home/homes/Home'

function HomePage({userData, logOut}) {
  return (
    <>
        <Header logOut={logOut} userData={userData}/>
        <Home userData={userData}/>
    </>
  )
}

export default HomePage