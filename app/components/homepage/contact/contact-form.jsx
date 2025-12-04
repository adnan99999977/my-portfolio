"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

 const handleSendMail = async (e) => {
  e.preventDefault();

  if (!userInput.name || !userInput.email || !userInput.message) {
    setError({ ...error, required: true });
    return;
  }

  setIsLoading(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "" });
    } else {
      toast.error(data.message || "Failed to send message");
    }
  } catch (err) {
    toast.error("Server error occurred!");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Contact with me</p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">If you have any questions or work opportunities, feel free to contact me.</p>

        <div className="mt-6 flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name:</label>
            <input
              type="text"
              maxLength="100"
              value={userInput.name}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] px-3 py-2 outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email:</label>
            <input
              type="email"
              maxLength="100"
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] px-3 py-2 outline-none transition-all"
            />
            {error.email && <p className="text-sm text-red-400">Please provide a valid email!</p>}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message:</label>
            <textarea
              maxLength="500"
              rows="4"
              value={userInput.message}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] px-3 py-2 outline-none transition-all"
            />
          </div>

          {/* Button */}
          <div className="flex flex-col items-center gap-3">
            {error.required && <p className="text-sm text-red-400">All fields are required!</p>}
            <button
              onClick={handleSendMail}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2 rounded-full text-white hover:gap-3 transition-all"
            >
              {isLoading ? "Sending..." : <><span>Send Message</span><TbMailForward size={20} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
