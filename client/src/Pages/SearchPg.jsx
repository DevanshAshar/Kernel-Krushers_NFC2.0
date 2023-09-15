import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SearchPg() {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [news, setNews] = React.useState([]);

  async function handleSubmit(e) {
    try {
        e.preventDefault();
        if(searchPhrase === "")
        {
            toast.error("Search field can't be kept empty");
        }
        else
        {
            const res = await axios.get(
                `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API_KEY}&country=in&q="${searchPhrase}"`
            );
            setNews(res.data.results);
            console.log(news);
        }
    } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong')
    }
  }

  function handleChange(event) {
    setSearchPhrase(event.target.value);
  }
  return (
    <div className="search-page-container">
      <input
        className="search-input"
        name="searchPhrase"
        onChange={(event) => handleChange(event)}
        type="text"
        placeholder="What news do you want to see today?"
        value={searchPhrase}
      />
      <button onClick={handleSubmit}>Search News Articles</button>
          <div className="d-flex flex-wrap">
            <div className="flex-wrap" style={{ display: "flex",alignItems:'center',justifyContent:'center' }}>
              {news && news.length > 0 ? (
                news?.map((n) => (
                  <Link to = {`/${n.article_id}`}>
                    <div
                      className="card m-2"
                      style={{ width: "18rem", border: "0.5px solid orange" }}
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
                  </Link>
                ))
              ) : (
                <p>No news here</p>
              )}
            </div>
          </div>
    </div>
  );
}
