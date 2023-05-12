import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import { FaShoppingBag,ImCart,RxCross1,GiHamburgerMenu,AiOutlineHeart,AiOutlineLogin } from "../../Icons/Icons";

const Navbar = () => {
    const [showBurger, setShowBurger] = useState(false);
    const getStyle = ({isActive}) =>{
      return isActive ? {border:"1px solid white"}:{};
    }
  return (
    <header>
      <nav className='navbar'>
        <div className="logo">TechBay</div>
        <ul className={showBurger ? "nav-links-mobile" : "nav-links"} onClick={()=> setShowBurger(false)}>
            <li><NavLink style={getStyle} className="link-name" to="/k" title='Product'><FaShoppingBag/></NavLink></li>
            <li><NavLink style={getStyle} className="link-name" to="/g" title='Cart'><ImCart/></NavLink></li>
            <li><NavLink style={getStyle} className="link-name" to="/j" title='WishList'><AiOutlineHeart/></NavLink></li>
            <li><NavLink style={getStyle} className="link-name" to="/j" title='Login'><AiOutlineLogin/></NavLink></li>
        </ul>
        <div className="hamburger-menu" onClick={()=> setShowBurger(!showBurger)}>
            { showBurger ? <RxCross1 className='hamburger-icon'/>:<GiHamburgerMenu className='hamburger-icon'/>}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
