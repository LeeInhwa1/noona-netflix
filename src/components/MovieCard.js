import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const MovieCard = ({ item }) => {
  const { genreList } = useSelector((state) => state.movie);
  return (
    <div
      className="card"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w250_and_h141_face${item.poster_path}` +
          ")",
      }}
    >
      <div className="overlay">
        <h5>{item.title}</h5>
        <div>
          {item.genre_ids.map((id) => (
            <Badge bg="danger">
              {genreList.find(item=>item.id===id).name}
            </Badge>
          ))}
        </div>
        <div>
          <sapn>{item.vote_average}</sapn>
          <sapn>{item.adult ? "청불" : "Under 18"}</sapn>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
