import Allwin from "./Images/Allwin.jpg";
import Resume from "./Resume/Resume.pdf"
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
function About() {

  let hasDownloaded = false;
  const aboutRef = useRef(null);

  const handleDownload = () => {
    if (!Resume) {
      toast.error('Resume file is not available!', {
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    if (hasDownloaded) {
      toast.warning('You have already initiated downloaded the resume. Please check in your downloaded files!', {
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

    hasDownloaded = true;

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
      link.href = Resume;
      link.download = 'Resume.pdf';
      link.click();
    }, 6000);
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
            <figcaption>I am <b>Allwin E K</b>, a passionate Web Developer. I have a solid foundation in <b>HTML, CSS and JavaScript</b>, and I love creating user-friendly and responsive web interfaces. I'm currently pursuing a <b>B.E</b> in <b>Computer Science and Engineering</b> at <b>Ponjesly College of Engineering, Nagercoil</b>.
              <br /><br />
              I strongly believe in continuous learning and improving myself, so I try my best to learn in any situation possible, unfavorable or not.
            </figcaption>
            <button className="gradient-button" style={{ fontSize: '20px' }} onClick={handleDownload}>Download Resume</button>
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