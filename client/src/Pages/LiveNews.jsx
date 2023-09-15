import React, { useEffect, useState } from "react";
import { Checkbox, Radio } from "antd";
import { Categories } from "../Components/Categories";
import { Languages } from "../Components/Languages";
import toast from "react-hot-toast";
import axios from "axios";

const LiveNews = () => {
  const [check, setCheck] = useState("");
  const [radio, setRadio] = useState("");
  const [news, setNews] = useState([]);

  const getNews = async (check, radio) => {
    try {
      console.log("here");
      if (!check && !radio) {
        const res = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_29480f0423d4e184e38a569ab68d36a56fc19&language=en&country=in`
        );
        setNews(res.data.results);
      } else if (check && !radio) {
        console.log(check);
        const res = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_29480f0423d4e184e38a569ab68d36a56fc19&language=en&category=${check}&country=in`
        );
        setNews(res.data.results);
      } else if (!check && radio) {
        console.log(radio);
        const res = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_29480f0423d4e184e38a569ab68d36a56fc19&language=${radio}&country=in`
        );
        setNews(res.data.results);
      } else {
        console.log(radio, check);
        const res = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_29480f0423d4e184e38a569ab68d36a56fc19&language=${radio}&category=${check}&country=in`
        );
        setNews(res.data.results);
      }
      
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };
  useEffect(() => {
    getNews(check, radio);
  }, [check, radio]);

  return (
    <>
      <div className="row m-5">
        <div className="col-md-2">
          <h5 className="text-center">Filter by Category</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setCheck(e.target.value)}>
              {Categories?.map((category) => (
                <Radio key={category._id} value={category.value}>
                  {category.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <h5 className="text-center mt-4">Filter by Language</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Languages?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.value}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">LIVE NEWS</h1>
          <div className="d-flex flex-wrap">
            <div className="flex-wrap" style={{ display: "flex" }}>
              {news && news.length > 0 ? (
                news?.map((n) => (
                  <div
                    className="card m-2"
                    style={{ width: "18rem", border: "0.5px solid orange"  }}
                    key={n.article_id}
                  >
                    <img
                      src={n.image_url}
                      className="card-img-top"
                      alt={null}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{n.title}</h5>
                      <p className="card-text">
                        {n.description
                          ? n.description.substring(0, 30)
                          : "Description not available"}
                        ...
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No news here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveNews;
