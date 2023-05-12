import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./Home.css";

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="hero-img-box">
      <img className='main-image' src="https://tse2.mm.bing.net/th?id=OIP.wP2f6WjJxh0ptaieVCk6XAHaEK&pid=Api&P=0" alt="TechBay" />
    </div>
    <div className="welcome-message">
      <span>Welcome To</span>
      <h1>TechBay</h1>
      <p>Unleash Your Tech Potential with TechBay: Choose from a Wide Range of Phones, TVs, Laptops, Speakers and More</p>
      <button className='btn'>Shop Now</button>
    </div>
    </>
  )
}

export default Home
