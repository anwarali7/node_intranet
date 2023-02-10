import React from 'react'
import './button.scss';

function Button(props) {
  return (
    <>
    <div className='button_login'>
        <button className='LoginButton'>
        <p>{props.name}</p>
        </button>
    </div>
    </>
  )
}

export default Button