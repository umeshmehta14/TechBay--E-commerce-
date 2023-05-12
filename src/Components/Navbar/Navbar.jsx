import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import { FaShoppingBag,ImCart,RxCross1,GiHamburgerMenu,AiOutlineHeart,GrLogin } from "../../Icons/Icons";

const Navbar = () => {
    const [showBurger, setShowBurger] = useState(false);
  return (
    <header>
      <nav className='navbar'>
        <div className="logo">TechBay</div>
        <ul className={showBurger ? "nav-links-mobile" : "nav-links"} onClick={()=> setShowBurger(false)}>
            <li><NavLink className="link-name" to="/" title='Product'><FaShoppingBag/></NavLink></li>
            <li><NavLink className="link-name" to="/" title='Cart'><ImCart/></NavLink></li>
            <li><NavLink className="link-name" to="/" title='WishList'><AiOutlineHeart/></NavLink></li>
            <li><NavLink className="link-name" to="/" title='Login'><GrLogin/></NavLink></li>
        </ul>
        <div className="hamburger-menu" onClick={()=> setShowBurger(!showBurger)}>
            { showBurger ? <RxCross1 className='hamburger-icon'/>:<GiHamburgerMenu className='hamburger-icon'/>}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
