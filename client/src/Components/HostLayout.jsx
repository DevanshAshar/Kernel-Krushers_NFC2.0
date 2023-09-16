import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PieChart from "./PieChart";

const HostLayout = () => {
  const [textData, setTextData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/news/text/`);
      setTextData(res.data);
      const res1 = await axios.get(`${process.env.REACT_APP_API}/news/img/`);
      setImgData(res1.data);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="data-and-images-container">
      <h3>Your News</h3>
      {textData && (
        <div className="text-container">
          <h4>Textual News</h4>
          <div className="card">
            {textData.map((textItem, index) => (
              <div key={index} className="text-card">
                <div className="card-body">{textItem.news}</div>
                <p>{textItem.category}</p>
                <p>{textItem.fake}</p>
                <PieChart labels={Object.keys(JSON.parse(textItem.sentiment.replace(/'/g, '"')))} percentages={Object.values(JSON.parse(textItem.sentiment.replace(/'/g, '"')))} />
              </div>
            ))}
          </div>
        </div>
      )}
      {imgData && (
        <div className="images-container">
          <h4>Image news</h4>
          {imgData.map((imgItem, index) => (
            <div key={index} className="image-card">
              <img
                src={imgItem.img}
                alt={null}
                className="card-img-top"
                style={{ width: "25vw", height: "auto" }}
              />
              <p>{imgItem.category}</p>
              <p>{imgItem.fake}</p>
              <PieChart labels={Object.keys(JSON.parse(imgItem.sentiment.replace(/'/g, '"')))} percentages={Object.values(JSON.parse(imgItem.sentiment.replace(/'/g, '"')))} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostLayout;
