import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi";
import {ImCross} from "react-icons/im";

const Navbar = () => {
    const [showBurger, setShowBurger] = useState(false);
  return (
    <header>
      <nav className='navbar'>
        <div className="logo">TechBay</div>
        <ul className={showBurger ? "nav-links-mobile" : "nav-links"} onClick={()=> setShowBurger(false)}>
            <li><NavLink className="link-name" to="/"> Home</NavLink></li>
            <li><NavLink className="link-name" to="/">About</NavLink></li>
            <li><NavLink className="link-name" to="/">Contact</NavLink></li>
            <li><NavLink className="link-name" to="/">SignUp</NavLink></li>
        </ul>
        <div className="hamburger-menu" onClick={()=> setShowBurger(!showBurger)}>
            { showBurger ? <ImCross/>:<GiHamburgerMenu/>}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
