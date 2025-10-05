import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTEwZDc3YTdmNjYzMzBmNjZiZGIxMzVlZjNkN2IwOCIsIm5iZiI6MTc1OTUxMDU5My42ODk5OTk4LCJzdWIiOiI2OGUwMDA0MTkzODIyYjkzZGRlY2I3OTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0dOjU_zmefBohRLtyQjzOBynQ_x_NN1j3Pmbmk6dvyI'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies for category:", category || "now_playing");
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        console.log("Fetched movies:", data.results);
        setApiData(data.results || []);
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };

    fetchMovies();

    const cardsContainer = cardsRef.current;
    if (cardsContainer) {
      cardsContainer.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category ? category : "now_playing"]); // stable dependency

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          card.backdrop_path && (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
