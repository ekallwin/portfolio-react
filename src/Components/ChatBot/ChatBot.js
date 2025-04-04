import { useState, useEffect, useRef, useCallback } from "react";
import profileData from "./profileData.json";
import "./ChatBot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Filter } from "bad-words";

export default function ChatBot() {

    const chatbotRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [conversationStep, setConversationStep] = useState(0);
    const [formattedName, setFormattedName] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [phoneLength, setPhoneLength] = useState(10);

    const handlePhoneChange = (phone, country) => {
        let expectedLength = 10;
        if (country && country.format) {
            expectedLength = country.format.replace(/[^.#]/g, "").length;
        }

        setPhoneLength(expectedLength);
        setInput(phone)
        setFormData((prev) => ({
            ...prev,
            phone: phone.startsWith("+") ? phone : "+" + phone
        }));
    };


    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            setMessages([{ sender: "bot", text: "Hello! How can I assist you today? Just ask me I'm always happy to help!", showButtons: true }]);
            setIsTyping(false);
        }, 3500);
    }, []);

    const restartChat = () => {
        setMessages([]);
        setIsTyping(true);
        setConversationStep(0);
        setTimeout(() => {
            setMessages([{ sender: "bot", text: "Hello! How can I assist you today? Just ask me I'm always happy to help!", showButtons: true }]);
            setIsTyping(false);
        }, 2000);
    };


    const sendContactForm = useCallback(() => {
        const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            name: formattedName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: "bot",
                        text: `${formattedName}, your message has been sent successfully! You will receive an email confirmation shortly!`
                    }
                ]);
            })


            .catch(() => {
                setMessages((prev) => [...prev, { sender: "bot", text: "There was an issue sending your message. Try again later" }]);
            });
    }, [formattedName, formData]);

    useEffect(() => {
        if (conversationStep === 5 && formData.message) {
            sendContactForm();
        }
    }, [conversationStep, formData.message, sendContactForm]);

    const toggleChat = () => setIsOpen(!isOpen);
    const filter = new Filter();
    const positiveWords = [
        "good", "great", "awesome", "excellent", "fantastic", "amazing", "nice",
        "wonderful", "superb", "outstanding", "love", "cool", "perfect", "best",
        "impressive", "brilliant", "spectacular", "super", "happy", "smile",
        "joy", "positive", "optimistic", "charming", "enthusiastic", "delightful",
        "radiant", "cheerful", "kind", "supportive", "grateful", "thankful",
        "beautiful", "sweet", "peaceful", "successful", "genius", "incredible",
        "fun", "friendly", "motivating", "uplifting", "encouraging", "energetic",
        "lively", "strong", "smart", "intelligent", "talented", "lovely",
        "passionate", "respectful", "honest", "loyal", "inspiring", "warm-hearted",
        "blessed", "fortunate", "appreciated", "celebrated", "victorious", "ok", "kk", "done"
    ];

    const negativeWords = [
        "bad", "worst", "awful", "terrible", "horrible", "poor", "disgusting",
        "hate", "upset", "sad", "angry", "frustrated", "annoying", "disappointing",
        "boring", "dumb", "stupid", "nonsense", "idiot", "miserable", "pathetic",
        "foolish", "dissatisfied", "ugly", "ridiculous", "offensive", "painful",
        "horrendous", "crap", "waste", "hopeless", "useless", "failure", "hurtful",
        "regret", "sick", "tired", "ashamed", "gloomy", "depressing", "depressed",
        "pointless", "horrid", "hateful", "shameful", "abysmal", "appalling",
        "inferior", "insulting", "loathsome", "lousy", "mediocre", "miserable",
        "offensive", "pathetic", "repulsive", "scornful", "troublesome",
        "vile", "wicked", "wretched", "nasty", "heartbreaking", "despair",
        "incompetent", "regretful", "unhappy", "undesirable", "unfair",
        "unforgivable", "unpleasant", "unworthy", "worthless", "nothing", "devastating"
    ];

    const socialMediaWords = [
        "facebook", "fb", "instagram", "insta", "twitter", "x", "linkedin",
        "threads", "social media", "github", "git", "snapchat", "sc", "tiktok",
        "reddit", "discord", "telegram", "whatsapp", "yt", "youtube", "pinterest",
        "social medias", "social"
    ];

    const contactWords = [
        "contact", "message", "reach", "call", "email", "phone", "support",
        "help", "assistance", "enquiry", "inquiry", "chat", "talk", "speak",
        "customer service", "helpdesk", "request", "info", "details", "query"
    ];

    const greetings = [
        "hi", "hello", "hey", "hii", "greetings"
    ];

    const getBotResponse = (query) => {

        const lowerCaseQuery = query.toLowerCase();
        if (socialMediaWords.some(word => lowerCaseQuery.includes(word))) {
            return {
                text: "Here are the social media links:",
                showSocialButtons: true,
            };
        }
        if (conversationStep <= 0) {

            if (filter.isProfane(lowerCaseQuery)) {
                return "This message may contain language that could be considered inappropriate or sensitive. I can't help you with this";
            }

            if (!/^[a-zA-Z0-9\s.,!?'\-+*/\\^%$#@&=<>{}[\]()_|~`]+$/.test(query)) {
                return "Currently, I only know English";
            }

            if (greetings.some(word => lowerCaseQuery.includes(word))) {
                return "Hello! How can I assist you today? Just ask me, I'm always happy to help!";
            }
            if (positiveWords.some(word => lowerCaseQuery.includes(word))) {
                return "Glad to hear that! It was nice talking to you. If you have any questions, feel free to ask!";
            }
            if (negativeWords.some(word => lowerCaseQuery.includes(word))) {
                return "Sorry to hear that! I'm constantly improving myself and I'm still learning. If you have any questions, feel free to ask!";
            }

            if (contactWords.some(word => lowerCaseQuery.includes(word))) {
                setConversationStep(1);
                return "Sure! Please provide your Name";
            }
        }
        if (conversationStep === 0) {
            if (lowerCaseQuery.includes("name")) return `My creator's name is ${profileData.name}`;
            if (lowerCaseQuery.includes("skills")) return `Here are some skills: ${profileData.skills.join(", ")}`;
            if (lowerCaseQuery.includes("college")) return `Currently studying at ${profileData.college}`;
            if (lowerCaseQuery.includes("projects")) return `Projects build by Allwin are: \n\n${profileData.projects.join(", \n\n")}`;
            if (lowerCaseQuery.includes("achievements")) return `Here are some achievements: \n\n${profileData.achievements.join("\n\n")}`;
            if (lowerCaseQuery.includes("about")) return `${profileData.about}`;
            if (socialMediaWords.some(word => lowerCaseQuery.includes(word))) {
                return {
                    text: "Here are the social media links:",
                    showSocialButtons: true,
                };
            }

        }

        if (conversationStep === 1) {
            if (filter.isProfane(query)) {
                return "Your name seems to contain inappropriate language. Please enter a valid name";
            }
            if (negativeWords.some(word => lowerCaseQuery.includes(word))) {
                return "I think you have entered a wrong name. Please enter a valid name";
            }
            if (socialMediaWords.some(word => lowerCaseQuery.includes(word))) {
                return "You meant Social media? If you wish to know my social media links, you can ask me after providing your contact details";
            }
            if (!/^[a-zA-Z\s]{3,}$/.test(query)) {
                return "Invalid name. It should be at least 3 characters long and contain only letters";
            }

            const formatted = query
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");

            setFormattedName(formatted);
            setFormData({ ...formData, name: formatted });
            setConversationStep(2);
            return `Got it, ${formatted}! Now, please enter your Email address to contact you. Make sure your email is real and be active`;
        }


        if (conversationStep === 2) {
            const lowerCaseEmail = query.toLowerCase();
            if (filter.isProfane(query)) {
                return "The email you entered contains inappropriate language. Please enter a valid email address";
            }
            if (
                !lowerCaseEmail.includes("@") ||
                !lowerCaseEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ||
                !lowerCaseEmail.match(/\.(com|in|org|edu\.in|net|co\.in)$/)
            ) {
                return "Invalid email address. Please enter a valid email (e.g., example@domain.com)";
            }
            setFormData({ ...formData, email: lowerCaseEmail });
            setConversationStep(3);
            return `Thanks, ${formattedName}! Now, please enter your phone number. I will use this to contact you, so make sure to enter the Phone correct number`;
        }

        if (conversationStep === 3) {
            const cleanedPhone = query.replace(/\D/g, "");

            if (socialMediaWords.some(word => lowerCaseQuery.includes(word))) {
                return "You meant Social media? If you wish to know my social media links, you can ask me after providing your contact details";
            }
            if (cleanedPhone.length !== phoneLength) {
                return `Invalid phone number length. Expected ${phoneLength} digits`;
            }

            setFormData({ ...formData, phone: query });
            setConversationStep(4);
            return `Almost done, ${formattedName}! Please enter the message you would like to send to Allwin`;
        }

        if (conversationStep === 4) {
            if (filter.isProfane(query)) {
                return "Your message contains inappropriate language. Please rephrase it politely";
            }
            setFormData((prevFormData) => ({
                ...prevFormData,
                message: query,
            }));
            setConversationStep(5);
            return "Sending your message...";
        }

        return "I'm not sure, but I'm learning!";
    };

    const sendMessage = () => {
        if (input.trim() === "") return;
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const botResponse = getBotResponse(input);

            if (typeof botResponse === "string") {
                setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
            } else {
                setMessages((prev) => [...prev, { sender: "bot", text: botResponse.text, showSocialButtons: botResponse.showSocialButtons }]);
            }

        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const handleButtonClick = (query) => {
        const userMessage = { sender: "user", text: query };
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const botResponse = getBotResponse(query);

            if (typeof botResponse === "string") {
                setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
            } else {
                setMessages((prev) => [...prev, {
                    sender: "bot",
                    text: botResponse.text,
                    showSocialButtons: botResponse.showSocialButtons || false
                }]);
            }

        }, 1500);

    };

    const closeMenu = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [chatbotRef]);

    return (
        <div className="chat-container" ref={chatbotRef}>
            <button onClick={toggleChat} className={isOpen ? "chat-close-icon dark-mode" : "chat-open-icon"}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faComment} size="xl" />
            </button>

            {isOpen && (
                <div className="chat-box">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                                {msg.text}
                                {msg.showButtons && conversationStep === 0 && (
                                    <div className="predefined-buttons">
                                        <button onClick={() => handleButtonClick("About")}>About Allwin</button>
                                        <button onClick={() => handleButtonClick("Achievements")}>Achievements</button>
                                        <button onClick={() => handleButtonClick("Contact")}>Contact Allwin</button>
                                        <button onClick={() => handleButtonClick("Projects")}>Projects</button>
                                        {/* <button onClick={() => handleButtonClick("social media")}>Social medias</button> */}
                                    </div>
                                )}
                                {msg.showSocialButtons && (
                                    <div className="predefined-buttons">
                                        <button onClick={() => window.open("https://www.facebook.com/ekallwin", "_blank")}>Facebook</button>
                                        <button onClick={() => window.open("https://github.com/ekallwin", "_blank")}>GitHub</button>
                                        <button onClick={() => window.open("https://www.instagram.com/ekallwin", "_blank")}>Instagram</button>
                                        <button onClick={() => window.open("https://www.linkedin.com/in/ekallwin", "_blank")}>LinkedIn</button>
                                        <button onClick={() => window.open("https://www.threads.net/@ekallwin", "_blank")}>Threads</button>
                                        <button onClick={() => window.open("https://x.com/ekallwin", "_blank")}>X (Twitter)</button>
                                    </div>
                                )}

                                {msg.sender === "bot" &&
                                    msg.text !== "Hello! How can I assist you today? Just ask me I'm always happy to help!" && msg.text !== "Sending your message..." &&
                                    (
                                        <div className="restart-chat">
                                            <button onClick={restartChat}>Restart Chat</button>
                                        </div>
                                    )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chat-message bot-message typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input">
                        {conversationStep === 2 ? (
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value.toLowerCase())}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter your email"
                                className="input-field"
                            />
                        ) : conversationStep === 3 ? (
                            <PhoneInput
                                country={"in"}
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                inputClass="phone-input"
                                containerClass="phone-input-container"
                                buttonClass="phone-dropdown-button"
                                dropdownClass="phone-dropdown"
                            />
                        ) : (
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="input-field"
                            />
                        )}
                        <button onClick={sendMessage} className="send-button"><FontAwesomeIcon icon={faPaperPlane} size="lg" /></button>
                    </div>
                </div>
            )}
        </div>
    );
}
