import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from 'react-router-dom'

function TitleCards({title, category}) { 
  const [apiData, setApiData] = useState([])
const cardsRef = useRef()

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDFiYjRjM2JiNmZmYzg3NDRmMWVlYWEyNTQ3MWQ3YyIsIm5iZiI6MTc1MDgyNTA2NS4zMzYsInN1YiI6IjY4NWI3ODY5NzU2MzI3OTgyMGM5Y2ViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RPiGCIq2UuEKojdKwwJCD-8rgnqd4QhZAopx3Idfxng'
  }
};




const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY

}

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.name || "Card image"} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
