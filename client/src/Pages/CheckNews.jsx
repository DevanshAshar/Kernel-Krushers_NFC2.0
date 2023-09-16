import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import languagesData from "../Components/ImagLang";
import PieChart from "../Components/PieChart";

export default function CheckNews() {
  const [languages, setLanguages] = useState(languagesData);
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const [category, setCategory] = useState();
  const [labels, setLabels] = useState();
  const [percentages, setPercentages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  console.log(selectedLanguage);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [fake, setFake] = useState(true);
  const [sentiment, setSentiment] = useState({});

  const handlePieChartData = async (sentimentData) => {
    // Extract labels and percentages from sentimentData
    const sentimentLabels = Object.keys(sentimentData);
    const sentimentPercentages = Object.values(sentimentData);
    setLabels(sentimentLabels);
    setPercentages(sentimentPercentages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const newsData = new FormData();
    try {
      newsData.append("img", image);
      newsData.append("lang", selectedLanguage);
      const response = await axios.post(`${process.env.REACT_APP_API}/news/img/`, newsData);
      console.log(response.data.sentiment);
      setSentiment(JSON.parse(response.data.sentiment.replace(/'/g, '"')));
      if (response.data.fake === "real") setFake(false);
      setCategory(response.data.category);
      console.log(sentiment);
      handlePieChartData(sentiment);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
    console.log(newsData);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleText = async () => {
    setLoading(true); // Start loading

    try {
      console.log("text");
      const res = await axios.post(`${process.env.REACT_APP_API}/news/text/`, { news: description });
      console.log(res.data.sentiment);
      setSentiment(JSON.parse(res.data.sentiment.replace(/'/g, '"')));
      if (res.data.fake === "real" || res.data.fake==="Real") setFake(false);
      setCategory(res.data.category);
      handlePieChartData(sentiment);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLink = async () => {
    setLoading(true); // Start loading

    try {
      console.log("link");
      const res = await axios.post(`${process.env.REACT_APP_API}/news/link`, { news: link });
      setSentiment(JSON.parse(res.data.sentiment.replace(/'/g, '"')));
      if (res.data.fake === "real") setFake(false);
      setCategory(res.data.category);
      handlePieChartData(sentiment);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const languageOptionElements = languages.map((object, index) => {
    return (
      <option key={index} value={object.value}>
        {object.name}
      </option>
    );
  });

  function handleLanguageChange(event) {
    setSelectedLanguage(event.target.value);
  }

  return (
    <div className="news-check-container">
      <h2>Upload your news article here to get a check on its authenticity.</h2>
      <div className="d-flex">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {image ? "1 file selected" : "Upload an image"}
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} hidden />
            </label>
            <select
              id="language-dropdown"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
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
              style={{ backgroundColor: "#FFF7ED" }}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button onClick={handleText}>Submit</button>
        </div>

        <div className="login-form" style={{ marginLeft: "20px" }}>
          <div className="mb-3">
            <input
              type="text"
              value={link}
              placeholder="News Link"
              style={{ backgroundColor: "#FFF7ED" }}
              className="form-control"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <button onClick={handleLink}>Submit</button>
        </div>
      </div>
      {loading ? ( // Show loader while loading is true
        <div className="spinner-grow" style={{width:'3rm',height:'3rm',textAlign:'center',justifyContent:'center'}} role="status">
        <span className="visually-hidden" style={{textAlign:'center'}}>Loading...</span>
      </div>
      ) : (
        <div>
          <div style={{ width: "400px", height: "400px" }}>
            <PieChart labels={Object.keys(sentiment)} percentages={Object.values(sentiment)} />
          </div>
          <div>
            <strong>Category:</strong> {category}
          </div>
          <div>
            <strong>Authenticity:</strong> {fake ? "Fake" : "Real"}
          </div>
        </div>
      )}
    </div>
  );
}