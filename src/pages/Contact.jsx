import React, { useState, useRef } from "react";
import "./Contact.scss";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_itzmjqi",
        "template_vw0rqka",
        form.current,
        "EjeM7F-WQj_UN2pUB"
      )
      .then(
        (result) => {
          setLoading(false);
          setIsFormSubmitted(true);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <div>
        (!isFormSubmitted ? (
        <form>
          <div>
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button type="submit"></button>
          </div>
        </form>
        ) : (<div>Thank you message!</div>))
      </div>
    </div>

    /* <div className="app__contact-container app__flex" id="contact">
      <div className="app__flex app__contact">
        <motion.div
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="app__flex app__contact-header"
          viewport={{ once: true }}
        >
          <h1 className="app__contact-heading header-highlight">Contact</h1>
          <p className="p-text">
            Want to have a conversation or work together? Leave your details and
            I'll get back to you as soon as I can.
          </p>
        </motion.div>
        {!isFormSubmitted ? (
          <motion.div
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="app__contact-form-container app__flex"
          >
            <form className="app__flex" onSubmit={sendEmail} ref={form}>
              <div className="input-container">
                <input
                  className="p-text sender-name"
                  type="text"
                  placeholder="Name"
                  name="sender-name"
                />
                <input
                  className="p-text sender-email"
                  type="text"
                  placeholder="Email"
                  name="sender-email"
                />
                <input
                  className="p-text sender-message"
                  placeholder="Message"
                  name="message"
                />
                <button
                  className="contact-button p-text"
                  type="submit"
                  value="Send"
                >
                  {!loading ? "Send" : "Sending..."}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div>
            <h3 className="email-sent-message p-text">
              Thank you for getting in touch! I'll get back to you as soon as I
              can.
            </h3>
          </div>
        )}
      </div>
    </div> */
  );
};

export default Contact;
