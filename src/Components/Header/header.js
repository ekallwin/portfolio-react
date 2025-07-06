import Typewriter from "typewriter-effect";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import './header.css';
import moment from 'moment';
function Header() {
  const buttonRef = useRef(null);
  const LinkedIn = () => {
    toast.info('Redirecting to LinkedIn', {
      autoClose: 3000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    setTimeout(() => {
      window.open('https://www.linkedin.com/in/ekallwin/', '_blank');
    }, 2500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    const buttonElement = buttonRef.current;

    if (buttonElement) {
      observer.observe(buttonElement);
    }

    return () => {
      if (buttonElement) {
        observer.unobserve(buttonElement);
      }
    };
  }, []);

  const currentHour = moment().hour();

  let greeting = '';
  if (currentHour >= 0 && currentHour < 12) {
    greeting = 'Morning';
  } else if (currentHour >= 12 && currentHour < 16) {
    greeting = 'Afternoon';
  } else {
    greeting = 'Evening';
  }

  return (
    <>
      <h1 id="Home">Allwin E K</h1>
      <div className="item-name" >
        <h2 className="titlename" >Good {greeting}!</h2>
        <h2 className="titlename" >I'm Allwin E K</h2>
        <div className="typing-effect" style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
          <h2 className="typewritter"><Typewriter
            options={{
              strings: ["MERN stack Developer", "Designer", "Freelancer"],
              autoStart: true,
              loop: true,
              deleteSpeed: 80,
              delay: 100,
            }}
          />
          </h2>
        </div>
        <button className="glass-button btn-fade" onClick={LinkedIn} ref={buttonRef}>Let's connect</button>
      </div>
    </>
  )
}
export default Header;