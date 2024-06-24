import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
         <span className='first'>S</span> WIFT 
         </div>
      

      <Link to='/profile' className='left-side'>
        <span className='profile'> EH </span>
      <span className='name'>   Ervin Howell</span> 
      </Link>
        
    
    </div>
  )
}

export default Navbar