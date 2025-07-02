import Allwin from "../Images/Allwin.jpg";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCircleCheck, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import './about.css'
function About() {
  const [buttonText, setButtonText] = useState(<>Download Resume <FontAwesomeIcon icon={faDownload} /></>);

  const hasDownloadedRef = useRef(false);

  const aboutRef = useRef(null);

  const handleDownload = () => {

    if (hasDownloadedRef.current) {
      toast.warning('You have already initiated to downloaded the resume. Please check in your downloaded files!', {
        autoClose: 6000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    toast.info('Preparing to download my resume', {
      autoClose: 3500,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    hasDownloadedRef.current = true;

    setButtonText(<>Download Pending <FontAwesomeIcon icon={faHourglassEnd} /></>);

    setTimeout(() => {
      toast.success('The resume download has been started !', {
        autoClose: 3500,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }, 3475);

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/Resume.pdf';
      link.download = 'Resume.pdf';
      link.click();
      setButtonText(<>Download Successful <FontAwesomeIcon icon={faCircleCheck} /></>);
    }, 5000);
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

    const aboutElement = aboutRef.current;

    if (aboutElement) {
      observer.observe(aboutElement);
    }

    return () => {
      if (aboutElement) {
        observer.unobserve(aboutElement);
      }
    };
  }, []);


  return (
    <>
      <div id="About" className="abt" >
        <h2 style={{ textAlign: 'center' }}>About</h2>
        <div className="About card fade-in" id="Abt" ref={aboutRef}>
          <figure>
            <img src={Allwin} alt="Allwin E K" onContextMenu={(e) => e.preventDefault()} draggable="false" style={{ userSelect: 'none' }} />
            <figcaption>&nbsp;&nbsp;&nbsp;&nbsp;I am <b>Allwin E K</b>, a passionate Web Developer. I have a solid foundation in Front End technologies like <b>HTML, CSS, JavaScript and React.js</b>, and I love creating user-friendly and responsive web interfaces. I'm currently pursuing a <b>B.E</b> in <b>Computer Science and Engineering</b> at <b>Ponjesly College of Engineering, Nagercoil</b>.
              <br /><br />
              &nbsp;&nbsp;&nbsp;&nbsp;I strongly believe in continuous learning and improving myself, so I try my best to learn in any situation possible, unfavorable or not.
            </figcaption>
            <button className="gradient-button-down" id="down_btn" style={{ fontSize: '20px' }} onClick={handleDownload}>{buttonText}</button>
          </figure>
        </div>
      </div>


      {/* <div className="Edu">
        <h2 style={{ textAlign: 'center' }}>Education</h2>
        <div className="About Education" >
          <h3>Ponjesly College of Engineering</h3>
          <h4>B.E in Computer Science and Engineering</h4>
          <div style={{ display: 'flex' }}>
            <h4>2022 - 2026</h4>
            <h5 style={{ marginLeft: 'auto' }}>CGPA: 7.54</h5>
          </div>
          <hr></hr>
         

        </div>
      </div> */}
    </>
  )
}
export default About;