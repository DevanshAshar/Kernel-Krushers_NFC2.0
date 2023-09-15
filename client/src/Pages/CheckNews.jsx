import axios from "axios";
import React, { useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";

export default function CheckNews() {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log('img')
    const newsData = new FormData();
    newsData.append("img", image);
    const response = await axios.post('http://127.0.0.1:8000/news/img/',newsData)
    console.log(newsData);
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleText = async () => {
    try {
      console.log('text')
      const res = await axios.post(`${process.env.REACT_APP_API}/news/text/`, { news: description })
    } catch (error) {
      console.log(error.message)
      toast.error('Something went wrong')
    }
  }

  const handleLink = async () => {
    try {
      console.log('link')
      const res = await axios.post(`${process.env.REACT_APP_API}/news/link`, { news: link })
    } catch (error) {
      console.log(error.message)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="news-check-container">
      <h2>Upload your news article here to get a check on whether it is authentic.</h2>
      <div className="d-flex">
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

        <div className="login-form" style={{ marginLeft: "20px" }}>
          <div className="mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="Description"
              style={{ backgroundColor: '#FFF7ED' }}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button onClick={handleText}>Submit</button>
        </div>

        <div className="login-form" style={{ marginLeft: "20px" }}>
          <div className="mb-3">
            <input
              type="text"
              value={link}
              placeholder="News Link"
              style={{ backgroundColor: '#FFF7ED' }}
              className="form-control"
              onChange={(e) => setLink(e.target.value)} />
          </div>
          <button onClick={handleLink}>Submit</button>
        </div>
      </div>
    </div>
  );
}
