import React from 'react'
import { Link } from 'react-router-dom'


const TopNav = () => {
  return (
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/login'>Login</Link></li>
      <li><Link to='/play'>Play</Link></li>
    </ul>
  )
}

export default TopNav
