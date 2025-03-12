import React, { useState, useEffect, useRef } from "react";
import { NotificationManager } from "react-notifications";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css"
import Flag from "./Flag.png"
import emailjs from "@emailjs/browser";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const contactRef = useRef(null);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 5) {
      value = value.slice(0, 5) + " " + value.slice(5);
    }
    if (value.length > 10) {
      value = value.slice(0, 11);
    }

    setFormData({ ...formData, phone: value });

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "name"
        ? value
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())
        : name === "email"
          ? value
            .toLowerCase()
          : name === "message"
            ? value
              .toLowerCase()
              .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase())
            : value
    });
  };

  const validate = () => {
    let isValid = true;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const consecutiveIdenticalRegex = /([a-zA-Z])\1{2,}/i;
    const consecutiveSequenceRegex = /([a-zA-Z])\2{6,}/;

    if (!formData.name.trim()) {
      NotificationManager.error("Name is required", null, 4000);
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      NotificationManager.error(`Invalid name "${formData.name.trim()}"`, null, 4000);
      isValid = false;
    } else if (!nameRegex.test(formData.name)) {
      NotificationManager.error(`Invalid name "${formData.name.trim()}"`, null, 4000);
      isValid = false;
    } else if (consecutiveIdenticalRegex.test(formData.name.replace(/\s+/g, ''))) {
      NotificationManager.error(`Invalid name "${formData.name.trim()}"`, null, 4000);
      isValid = false;
    } else if (consecutiveSequenceRegex.test(formData.name.replace(/\s+/g, ''))) {
      NotificationManager.error(`Invalid name "${formData.name.trim()}"`, null, 4000);
      isValid = false;
    }

    const phoneRegex = /^(?!([0-9])\1{9})[6-9]\d{9}$/;

    if (!formData.phone.trim()) {
      NotificationManager.error("Phone number is required", null, 4000);
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.trim().replace(/\s/g, ""))) {
      NotificationManager.error("Invalid phone number", null, 4000);
      isValid = false;
    }



    if (!formData.email.trim()) {
      NotificationManager.error("Email address is required", null, 4000);
      isValid = false;
    } else if (
      !formData.email.includes("@") ||
      !formData.email.match(/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})?$/) ||
      !formData.email.match(/\.(com|in|org|edu\.in|net|co\.in)$/)
    ) {
      NotificationManager.error("Invalid email address", null, 4000);
      isValid = false;
    }

    if (!formData.message.trim()) {
      NotificationManager.error("Message cannot be empty", null, 4000);
      isValid = false;
    } else if (formData.message.length > 500) {
      NotificationManager.error("Message cannot be more than 500 characters long", null, 4000);
      isValid = false;
    }
    else {
      const messageRegex = /^[a-zA-Z0-9.,'"!&\s@%#%^*(){}?+-/]*$/;
      if (!messageRegex.test(formData.message)) {
        NotificationManager.error("Message can only contain alphabets, numbers, and some special symbols", null, 4000);
        isValid = false;
      }
    }

    return isValid;
  };


  const notify = () => {
    const toastId = toast.loading("Sending message...", {
    });

    setTimeout(() => {
      toast.update(toastId, {
        render: "Your message has been sent successfully! You will receive Email confirmation shortly",
        type: "success",
        isLoading: false,
        autoClose: 6500,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: true,
      });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {

      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      };

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
          notify();
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
          toast.error("Failed to send message. Try again later.");
        });
    }
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

    const contactElement = contactRef.current;

    if (contactElement) {
      observer.observe(contactElement);
    }

    return () => {
      if (contactElement) {
        observer.unobserve(contactElement);
      }
    };
  }, []);

  return (
    <div className="contact" id="Contact">
      <h2 >Contact me</h2>
      <form onSubmit={handleSubmit} className="fade-in-contact" ref={contactRef}>
        <div className="input-container">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="" pattern="[A-Za-z\s]*" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ""); }} style={{ width: "100%" }} />
          <label>Name</label>
        </div>
        <div className="input-container" >
          <img src={Flag} alt="Indian Flag" style={{ position: 'absolute', top: '20px', left: '8px', transform: 'translateY(-50%)', borderRadius: '0', width: '28px', height: '20px', pointerEvents: 'none' }} />
          <input style={{ paddingLeft: '43px', width: '100%', fontSize: '16px', height: '40px', boxSizing: 'border-box', }}
            id="phone"
            type="text"
            inputMode="numeric"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder=""
            maxLength="11"
          />
          <label style={{ marginLeft: '30px' }}>Phone Number</label>
        </div>
        <div className="input-container" style={{ marginTop: "20px" }}>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder=" " style={{ width: "100%" }} />
          <label>Email Address</label>
        </div>
        <div className="input-container">
          <textarea type="text" name="message" value={formData.message} maxLength={500} onChange={handleChange} placeholder=" " style={{ width: "100%" }} />
          <label>Your Message</label>
          <div className="char-count">{formData.message.length}/500</div>
        </div>
        <button type="submit" className="submit" style={{ marginTop: "10px" }}>Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
