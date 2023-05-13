import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { FaShoppingBag,ImCart,RxCross1,GiHamburgerMenu,AiOutlineHeart,AiOutlineLogin, AiOutlineSearch } from "../../Icons/Icons";

const Navbar = () => {
    const [showBurger, setShowBurger] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const getStyle = ({isActive}) =>{
      return isActive ? {border:"1px solid white"}:{};
    }
  return (
    <header>
      <nav className='navbar'>
        <div className="nav-top-section">

        <div className="logo" onClick={()=> navigate("/")}>TechBay</div>
        
        <div className="navbar-icons-section">

        <div onClick={()=> setShowSearch(!showSearch)} className="search-icon"><AiOutlineSearch/></div>

        <ul className={showBurger ? "nav-links-mobile" : "nav-links"} onClick={()=> setShowBurger(false)}>
            <li><NavLink style={getStyle} className="link-name" to="/products" title='Product'><FaShoppingBag/></NavLink></li>
            <li><NavLink style={getStyle} className="link-name" to="/g" title='Cart'><ImCart/></NavLink></li>
            <li><NavLink style={getStyle} className="link-name" to="/j" title='WishList'><AiOutlineHeart/></NavLink></li>
            <li><NavLink style={getStyle} className="link-name" to="/j" title='Login'><AiOutlineLogin/></NavLink></li>
        </ul>

        <div className="hamburger-menu" onClick={()=> setShowBurger(!showBurger)}>
            { showBurger ? <RxCross1 className='hamburger-icon'/>:<GiHamburgerMenu className='hamburger-icon'/>}
        </div>

        </div>



        </div>
        <div  className={showSearch ? "search-input-box": "disp-none" }>
        <label htmlFor="search"><AiOutlineSearch/></label>
      <input type="text" className="search-btn" id="search" placeholder="What are you looking for?"/>
      </div>
      </nav>
      
    </header>
  )
}

export default Navbar
