import Typewriter from "typewriter-effect";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
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
            entry.target.classList.remove("hide");
          } else {
            entry.target.classList.add("hide");
            entry.target.classList.remove("show"); 
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

  return (
    <>
      <h1 id="Home">Allwin E K</h1>
      <div className="item-name" >
        <h2 className="titlename" >Hi, I'm Allwin E K</h2>
        <div className="typing-effect" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className="typewritter" style={{ marginLeft: '25px' }}>I'm</h2>
          <h2 className="typewritter"><Typewriter
            options={{
              strings: ["Front-end Developer", "Designer", "Freelancer"],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 100,
            }}
          />
          </h2>
        </div>
        <button className="gradient-button btn-fade" onClick={LinkedIn} ref={buttonRef}>Let's connect</button>
      </div>
    </>
  )
}
export default Header;