import Navbar from "./Components/Navbar/navbar.js"
import Header from "./Components/Header/header.js"
import About from "./Components/About/about.js"
import Contact from "./Components/Contact/contact.js"
import Footer from "./Components/Footer/footer.js"
import ChatBot from "./Components/ChatBot/ChatBot.js"
function Home() {
    return (
        <>
            <Navbar />
            <Header />
            <About />
            <Contact />
            <ChatBot />
            <Footer />
        </>
    )
}
export default Home;