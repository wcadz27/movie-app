import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_movie-app",
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
    <div className="relative h-[50vw] w-full flex justify-center items-center">
      <div className="bg-gray-200 w-full h-[800px] p-[2em]">
        <h1 className="text-black text-3xl font-bold mb-[1.5em] bg-blue-500 inline-block p-2 rounded-lg">
          Contact Us
        </h1>
        <div className="flex w-full gap-x-[2em]">
          {!isFormSubmitted ? (
            <form className="inline-block" onSubmit={sendEmail} ref={form}>
              <div className="flex flex-col gap-y-[1em] w-[350px]">
                <input
                  className=" border-gray-300 outline-gray-800 border-2 rounded-md pl-3 py-2"
                  type="text"
                  placeholder="Name"
                  name="sender-name"
                />
                <input
                  className=" border-gray-300 outline-gray-800 border-2 rounded-md pl-3 py-2"
                  type="text"
                  placeholder="Email"
                  name="sender-email"
                />
                <textarea
                  className=" border-gray-300 outline-gray-800 border-2 rounded-md pl-3 h-[6em] pt-2"
                  placeholder="Message"
                  name="message"
                />
                <button
                  className="bg-blue-600 text-white py-2 rounded-md"
                  type="submit"
                  value="Send"
                >
                  {!loading ? "Send" : "Sending..."}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h3 className="text-black ">
                Thank you for getting in touch! I'll get back to you as soon as
                I can.
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
