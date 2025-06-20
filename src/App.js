import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { NotificationContainer } from 'react-notifications';
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-notifications/lib/notifications.css';
import ScrollToTop from './ScrollToTop';
import Home from "./Home";
import Projects from "./Components/project";
import Achievements from "./Components/achievements";
import { useEffect, useRef } from "react";

function App() {
const videoRef = useRef(null);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.playbackRate = 3.5;
  }
}, []);

  return (
    <div className="app-container">
      <video autoPlay muted loop className="background-video" ref={videoRef}>
        <source src={`${process.env.PUBLIC_URL}/Background.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    <BrowserRouter>
      <NotificationContainer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
