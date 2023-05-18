import React, {useEffect, useState} from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const ImageSlider = () => {
//   const images = [
//     "https://tse3.mm.bing.net/th?id=OIP.9jRDfL10jFdFwU4_ZgRtxwHaEs&pid=Api&P=0&h=180",
//     // "https://tse4.mm.bing.net/th?id=OIP.GouCi7F-g4LmDUArJoXZAQHaEI&pid=Api&P=0&h=180",
//     // "https://tse1.mm.bing.net/th?id=OIP.l0H5yurqu1f-jtaUjfSgxQHaE8&pid=Api&P=0",
//     // "https://tse4.mm.bing.net/th?id=OIP.2BsgWseklcQpI-MZiN4MVwHaEK&pid=Api&P=0&h=180"
//     // "https://tse4.mm.bing.net/th?id=OIP.J5pUsGQP60UxoXHaKpiLwAHaCY&pid=Api&P=0&h=180"
//     // Add more images as needed
//   ];
//   // ... previous code
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2000, // Adjust the autoplay speed as desired
//     speed: 500, // Adjust the transition speed as desired
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     afterChange: (current) => setCurrentSlide(current),
//   };

//   const headings = ["Heading 1", "Heading 2", "Heading 3"]; // Array of headings

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     // Update current slide every time the slider changes
//     const slideChangeHandler = (current) => {
//       setCurrentSlide(current);
//     };

//     // return () => {
//     //   // Cleanup the event listener when the component unmounts
//     //   Slider.on("afterChange", slideChangeHandler);
//     // };
//   }, []);



//   return (
//     <div className="slider-box">
//     <h2 className="fade-up-heading">{headings[currentSlide]}</h2>
//     <Slider {...sliderSettings} className="image-slide-box">
//       {images.map((image, index) => (
//         <div key={index}>
//           <img className="main-image" src={image} alt={`Slide ${index + 1}`} />
//         </div>
//       ))}
//     </Slider>
//     </div>
//   );
// };


const HeroSection = () => {

  const navigate = useNavigate();
  return (
    <>
      <div className="hero-box">
         <div className="hero-img-box">
        {/* <ImageSlider/> */}
          <img
            className="main-image"
            src="https://neilpatel.com/wp-content/uploads/2015/04/ecommerce.jpg"
            alt="TechBay"
          />
        </div>
        
        <div className="welcome-message">
          <span>Welcome To</span>
          <h1>TechBay</h1>
          <p>
            Unleash Your Tech Potential with TechBay: Choose from a Wide Range
            of Phones, TVs, Laptops, Speakers and More
          </p>
          <button onClick={()=>navigate("/products")} className="btn">Shop Now</button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
