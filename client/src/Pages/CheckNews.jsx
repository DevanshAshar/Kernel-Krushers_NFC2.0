import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import languagesData from "../Components/ImagLang";
import PieChart from "../Components/PieChart";

export default function CheckNews() {
  const [languages, setLanguages] = useState(languagesData);
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const [labels,setLabels]=useState()
  const [percentages,setPercentages]=useState([])
  console.log(selectedLanguage);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newsData = new FormData();
    try {      
      newsData.append("img", image);
      newsData.append("lang",selectedLanguage)
      const response = await axios.post(`${process.env.REACT_APP_API}/news/img/`,newsData)
      console.log(response.data)
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error.message)
    }
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
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
      toast.error('Something went wrong')
    }
  }

  const languageOptionElements = languages.map((object, index) => {
    return (
        <option key={index} value={object.value}>{object.name}</option>
    );
  });

  function handleLanguageChange(event)
  {
    setSelectedLanguage(event.target.value);
  }

  return (
    <div className="news-check-container">
      <h2>Upload your news article here to get a check on it's authenticity.</h2>
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
            <select id="language-dropdown" value={selectedLanguage} onChange={handleLanguageChange} onClick={(event) => {event.stopPropagation()}}>
                {languageOptionElements}
            </select>
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
      <PieChart labels={labels} percentages={percentages} />
    </div>
  );
}
