import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Home.css";
import { NotificationContainer } from 'react-notifications';
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-notifications/lib/notifications.css';

import Home from "./Home"
import Projects from "./Components/project"
import Achievements from "./Components/achievements"
function App() {

  return (
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
