import React, { useState, useEffect } from "react";
import './achievements.css';
import DMI from './Carousel/DMI College Symposium.jpg';
import Amrita from './Carousel/Amrita College Symposium.jpg';
import AVCE from './Carousel/AVCE College Symposium.jpg';
import SXCCE from './Carousel/St Xavier Symposium.jpg';
import Loyola from './Carousel/Loyola.jpg';
import Amrita2025 from './Carousel/Amrita2025.jpg'
import Navbar from './navbar';
import Footer from './footer';

const Carousel = () => {
  const slides = [
    {
      image: DMI,
      caption: "1st Prize in Web Browser Design and Quiz at DMI College of Engineering, Aralvaimozhi",
    },
    {
      image: Amrita,
      caption: "2nd Prize in Web Pixies at Amrita College of Engineering and Technology, Erachakulam",
    },
    {
      image: AVCE,
      caption: "3rd Prize in Technical Quiz at Annai Vailankanni College Of Engineering, Azhagappapuram",
    },
    {
      image: SXCCE,
      caption: "1st Prize in Paper Presentation at St. Xavier's Catholic College of Engineering, Chunkankadai",
    },
    {
      image: Loyola,
      caption: "1st Prize in Quiz at Loyola Institute of Technology and Science, Thovalai",
    },
    {
      image: Amrita2025,
      caption: "2nd Prize in Web designing at Amrita College of Engineering and Technology, Erachakulam",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: 'center' }} id="achievments">Achievements</h2>
      <div className="carousel">
        <button
          className="prev"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
        >
          ❮
        </button>

        <div
          className="carousel-slide"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-item">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                onClick={togglePause}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        <button
          className="next"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          ❯
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

      <div className="carousel-caption">
        <p>{slides[currentIndex].caption}</p>
      </div>

      <Footer />
    </>
  );
};

export default Carousel;
