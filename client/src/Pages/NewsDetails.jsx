import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const NewsDetails = () => {
  const params = useParams();
  const [news, setNews] = useState([]);
  const [pnews, setPnews] = useState([]);
  const getNews = async (id) => {
    try {
      const res = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setNews(res.data.results);
      //console.log(news)
        console.log(id)
      for(let i=0;i<news.length;i++)
      {
        //console.log(news[i].article_id)
        if(news[i].article_id===id)
        return news[i];
      }
    //   return news.find((n) => n.article_id === id);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };
  const getParticularNews = async (id) => {
    const n = await getNews(id);
    setPnews(n);
    console.log(pnews);
  };
  useEffect(() => {
    getParticularNews(params.id);
  }, []);
  return (
    <>
      <div className="col-md-6">
        <h1 className="text-center mt-4">News Details</h1>
        {/* <h6 className="mt-4">Name: {product.prodName}</h6>
        <h6>Brand: {product.brand}</h6>
        <h6>Category: {product.category}</h6>
        <h6>Price: ₹{product.price}</h6>
        <h6>Description: {product.description}</h6> */}
      </div>
    </>
  );
};

export default NewsDetails;
