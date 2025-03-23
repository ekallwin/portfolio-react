import Navbar from "./Components/navbar.js"
import Header from "./Components/header.js"
import About from "./Components/about.js"
import Contact from "./Components/contact.js"
import Footer from "./Components/footer.js"
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