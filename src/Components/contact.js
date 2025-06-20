import React, { useState, useEffect, useRef } from "react";
import { NotificationManager } from "react-notifications";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";
import "./contactres.css";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Filter } from 'bad-words';
import moment from 'moment-timezone';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    countryCode: "in",
  });
  const [phoneLength, setPhoneLength] = useState(10);

  const contactRef = useRef(null);

  const handlePhoneChange = (phone, country) => {

    let expectedLength = 10;
    if (country && country.format) {
      expectedLength = country.format.replace(/[^.#]/g, "").length;
    }

    setPhoneLength(expectedLength);
    setFormData((prev) => ({ ...prev, phone: phone.startsWith("+") ? phone : "" + phone }));
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

    const cleanedPhone = formData.phone.replace(/\D/g, "");

    if (!cleanedPhone) {
      NotificationManager.error("Phone number is required", null, 4000);
      isValid = false;
    } else if (cleanedPhone.length < phoneLength) {
      NotificationManager.error("Invalid Phone Number", null, 4000);
      isValid = false;
    } else if (cleanedPhone.length !== phoneLength) {
      NotificationManager.error("Invalid Phone Number", null, 4000);
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
      const filter = new Filter();
      if (filter.isProfane(formData.message)) {
        NotificationManager.error("Message contains inappropriate language", null, 4000);
        isValid = false;
      }
      const messageRegex = /^[a-zA-Z0-9.,'"!&\s@%#%^*(){}?+-/]*$/;
      if (!messageRegex.test(formData.message)) {
        NotificationManager.error("Message can only contain alphabets, numbers, and some special symbols", null, 4000);
        isValid = false;
      }
    }

    return isValid;
  };


  const notify = () => {
    const toastId = toast.loading("Sending your message... Please don't close this page", {
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
    }, 3000);
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
        timestamp: moment().format('YYYY-MM-DD[T]HH:mm:ssZ'),
        sendtime: moment().format('DD-MM-YYYY hh:mm:ss A')
      };

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
      notify();
      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {

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


  useEffect(() => {
    const updateDropdownWidth = () => {
      const phoneInput = document.querySelector('.react-tel-input');
      const dropdown = document.querySelector('.country-list');

      if (phoneInput && dropdown) {
        const viewportWidth = window.innerWidth;
        const baseWidth = phoneInput.offsetWidth;

        const ratio = 0.95 + (600 - Math.min(600, viewportWidth)) * 0.0005;

        dropdown.style.width = `${baseWidth * ratio}px`;
      }
    };

    updateDropdownWidth();

    const resizeObserver = new ResizeObserver(updateDropdownWidth);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="contact" id="Contact">
      <h2>Contact me</h2>
      <form onSubmit={handleSubmit} className="fade-in-contact" ref={contactRef}>
        <div className="input-container">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="" pattern="[A-Za-z\s]*" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ""); }} style={{ width: "100%" }} />
          <label>Name</label>
        </div>

        <div className="input-container phone-input-wrapper">
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputClass="phone-input"
            containerClass="phone-input-container"
            buttonClass="phone-dropdown-button"
            dropdownClass="phone-dropdown"
            enableSearch={true}
          />
        </div>

        <div className="input-container" style={{ marginTop: "20px" }}>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder=" " style={{ width: "100%" }} />
          <label>Email Address</label>
        </div>
        <div className="input-container">
          <textarea type="text" name="message" value={formData.message} maxLength={501} onChange={handleChange} placeholder=" " style={{ width: "100%" }} />
          <label>Your Message</label>
          <div className={formData.message.length > 490 ? "char-count-max" : "char-count"}>
            {formData.message.length > 490
              ? `${Math.max(0, 500 - formData.message.length)} characters left`
              : `${formData.message.length}/500`}
          </div>



        </div>
        <button type="submit" className="submit" style={{ marginTop: "10px" }}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  );
};

export default ContactForm;
