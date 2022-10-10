import { React, useState, useEffect } from "react";
import styles from "../styles/simplePages.module.css";
import { useSelector } from "react-redux";
import back13 from "../assets/backgroundtesting/back13.png";
import useMatches from "../hooks/useMatches";
import axios from "axios";
import ImageListCards from "../commons/ImageListCards";
import { ImageList, ImageListItem, ListSubheader } from "@mui/material";

const Favorites = () => {
  /* media query configuration */
  const matches = useMatches();

  /* fetching information */
  /* const user = JSON.parse(localStorage.getItem("user")); */
  const user = useSelector((state) => state.user);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  useEffect(() => {
    let { favorite_movie } = user;
    setMovies([]);
    favorite_movie.forEach((item) =>
      axios
        .get(`http://localhost:5000/api/media/request/movie/${item}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setMovies((previous) => {
            return [...previous, data];
          });
        })
    );
  }, []);

  useEffect(() => {
    let { favorite_tv } = user;
    setTv([]);
    favorite_tv.forEach((item) =>
      axios
        .get(`http://localhost:5000/api/media/request/tv/${item}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTv((previous) => {
            return [...previous, data];
          });
        })
    );
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${back13})`,
      }}
      className={styles.backResults}
    >
      <ImageList
        sx={{ width: 3 / 4, mx: "auto" }}
        cols={matches ? 4 : 2}
        variant="standard"
      >
        <ImageListItem key="Subheader" cols={matches ? 4 : 2}>
          <ListSubheader component="div">
            {movies.length > 0 ? "Favorite movies" : "No favorite movies yet!"}
          </ListSubheader>
        </ImageListItem>{" "}
        {movies.map((item, i) => (
          <ImageListCards user={user} type={"movie"} key={i} item={item} />
        ))}
      </ImageList>

      <ImageList
        sx={{ width: 3 / 4, mx: "auto" }}
        cols={matches ? 4 : 2}
        variant="standard"
      >
        <ImageListItem key="Subheader" cols={matches ? 4 : 2}>
          <ListSubheader component="div">
            {tv.length > 0 ? "Favorite tv shows" : "No favorite tv shows yet!"}
          </ListSubheader>
        </ImageListItem>
        {tv.map((item, i) => (
          <ImageListCards user={user} type={"tv"} key={i} item={item} />
        ))}
      </ImageList>
    </div>
  );
};

export default Favorites;
