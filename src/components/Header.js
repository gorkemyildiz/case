import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
     <header className="header">
        <div className="container">
            <div className="logo">
                <h1>Where in the world ?</h1>
            </div>
            <FontAwesomeIcon icon={faCircle} />
        </div>
    </header>
  )
}

export default Header;