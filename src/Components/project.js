import Dine from "./Project Images/Dine.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import Navbar from "./navbar";
import Footer from "./footer";
import ChatBot from "./ChatBot/ChatBot"

function projects() {
  const handleLinkClick = (event, url, message) => {
    event.preventDefault();
    toast.info(message, {
      autoClose: 3000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 2500);
  };
  return (
    <>
      <Navbar />
      <div className="Projects">
        <h2 style={{ textAlign: 'center' }} id="Projects">Projects</h2>

        <div className="Project">
          <img src={Dine} alt='Dine' className='Pro-img'></img>
          <div className="Project-info">
            <h4>Food ordering website (Front-End)</h4>
            <ul>
              <legend>Skills used</legend>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>
          <div className="Project-links">
            <a href="https://github.com/ekallwin/Dine" target="_blank" rel="noopener noreferrer" className="pro-icon" onClick={(e) => handleLinkClick(e, 'https://github.com/ekallwin/Dine', 'Redirecting to GitHub')}>
              <FontAwesomeIcon icon={faGithub} size="xl" />
              <span>GitHub</span>
            </a>
            <a href="https://ekallwin-dine.vercel.app/" target="_blank" rel="noopener noreferrer" className="pro-icon" onClick={(e) => handleLinkClick(e, 'https://ekallwin-dine.vercel.app/', 'Redirecting to Live Demo')}>
              <FontAwesomeIcon icon={faLink} size='xl' />
              <span>Live Demo</span>
            </a>
          </div>
        </div>

      </div>
      <ChatBot />
      <Footer />
    </>
  )
}
export default projects;