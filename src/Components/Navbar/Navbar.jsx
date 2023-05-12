import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi";
import {ImCart, ImCross} from "react-icons/im";
import "./Navbar.css";

const Navbar = () => {
    const [showBurger, setShowBurger] = useState(false);
  return (
    <header>
      <nav className='navbar'>
        <div className="logo">TechBay</div>
        <ul className={showBurger ? "nav-links-mobile" : "nav-links"} onClick={()=> setShowBurger(false)}>
            <li><NavLink className="link-name" to="/">Home</NavLink></li>
            <li><NavLink className="link-name" to="/">Products</NavLink></li>
            <li><NavLink className="link-name" to="/">Cart <ImCart/></NavLink></li>
            <li><NavLink className="link-name" to="/">WishList <ImCart/></NavLink></li>
            <li><NavLink className="link-name" to="/">Login</NavLink></li>
        </ul>
        <div className="hamburger-menu" onClick={()=> setShowBurger(!showBurger)}>
            { showBurger ? <ImCross className='hamburger-cross'/>:<GiHamburgerMenu/>}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
