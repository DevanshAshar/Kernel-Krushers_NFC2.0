import React, { useState } from "react";
import axios from 'axios'
export default function CheckNews() {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [image, setImage] = useState(null);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newsData = new FormData();
    newsData.append("img", image);
    const response = await axios.post('http://127.0.0.1:8000/news/img/',newsData)
    console.log(newsData);
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  return (
    <div className="news-check-container">
      <h2>Upload your news article file here to get a check on whether it is authentic.</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {image ? "1 file selected" : "Upload an image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
    