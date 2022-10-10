import { React, useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-carousel-minimal";
import Loading from "../commons/Loading";
import back12 from "../assets/backgroundtesting/back12.png";
import "../styles/home.css";
import useMatches from "../hooks/useMatches";

const Home = () => {
  /* media queries custom hook */
  const matches = useMatches();

  /* fetching popular movies and tv shows */
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvShows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/media/movies")
      .then((data) => setMovies(data.data));

    axios
      .get("http://localhost:5000/api/media/tv")
      .then((data) => setTvShows(data.data));
  }, []);

  /* the api configuration is set to return 10 results so this if verifies if everything is fetched */

  if (movies.length !== 10 || tvshows.length !== 10) {
    return <Loading />;
  }

  /* configuration of data to make it fit the carousel needs */

  const dataMovies = movies.map((movie) => ({
    image: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
    caption: `${movie.original_title} (Movie)`,
  }));

  const dataTv = tvshows.map((show) => ({
    image: `https://image.tmdb.org/t/p/original/${show.backdrop_path}?w=124&fit=crop&auto=format`,
    caption: `${show.name} (TV)`,
  }));

  /* carousel extra configuration */

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div
      style={{ backgroundColor: "#0e1a2e", paddingBottom: matches ? 150 : 70 }}
    >
      <div>
        {/* container for the heaver and the text */}
        <header
          className="header"
          style={{
            backgroundImage: `url(${back12})`,
            backgroundPosition: matches ? "50%" : "30%",
          }}
        />
        <div
          className="titleBox"
          style={{
            position: "absolute",
            top: "30%",
            left: matches ? "60%" : "50%",
          }}
        >
          <p
            className="title"
            style={{
              fontSize: matches ? 40 : 30,
            }}
          >
            Welcome to the movie house
          </p>
          <p style={{ marginTop: -30 }}>
            Search, organize, and discover the best movies and tv shows!
          </p>
        </div>
      </div>
      <div style={{ backgroundColor: "#0e1a2e", marginTop: 60 }}>
        <p
          className="bubble"
          style={{
            padding: matches ? 30 : 15,
          }}
        >
          Popular movies and tv shows right now
        </p>
        <Carousel
          data={[...dataMovies, ...dataTv]}
          time={2000}
          width="850px"
          height="500px"
          captionStyle={captionStyle}
          slideNumber={true}
          slideNumberStyle={slideNumberStyle}
          captionPosition="bottom"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="#0e1a2e"
          slideImageFit="cover"
          thumbnails={true}
          thumbnailWidth="100px"
          style={{
            textAlign: "center",
            maxWidth: "850px",
            maxHeight: "500px",
            margin: "0 auto",
            paddingTop: matches ? 70 : 50,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
