import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!name || !email || !message) {
      setError("All fields are required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      if (image) formData.append("image", image);

      try {
        const response = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          alert("Message sent successfully!");
          setName("");
          setEmail("");
          setMessage("");
          setImage(null);
        } else {
          alert("Failed to send message");
        }
      } catch (error) {
        alert("Error sending message");
      }
    }
  };

  return (
    <>
      <div className="container mt-5 outer">
        <h1 className="contact-us">Contact Us</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image Attachment
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary submitBtn">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
