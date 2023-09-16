import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    <>
      {textData && (
        <div>
          <h2>Textual News</h2>
          <div className="card">
            {textData.map((textItem) => (
              <div className="card">
                <div className="card-body">{textItem.news}</div>
                <p>{textItem.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {imgData && (
        <div>
          <h2>Image news</h2>
          {imgData.map((imgItem) => (
            <div className="card">
              <img src={imgItem.img} alt={null} className="card-img-top" />
              <p>{imgItem.category}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HostLayout;
