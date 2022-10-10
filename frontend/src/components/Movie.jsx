import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Loading from "../commons/Loading";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { favoritesRequest } from "../store/user.js";
import { Favorite, FavoriteBorder } from "@mui/icons-material/";
/* import ShareIcon from "@mui/icons-material/Share"; */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import index from "../assets/index.png";

/* material ui config */

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Movie = () => {
  /* fetching information for the api requests */
  const { type, id } = useParams();

  /* setting up the process */
  const navigate = useNavigate();
  const [data, setData] = useState({});

  /* fetching info from the api */
  const requestMedia = useCallback(() => {
    axios
      .get(`http://localhost:5000/api/media/request/${type}/${id}`)
      .then((res) => res.data)
      .then((data) => setData(data))
      .catch(() => {
        navigate("/404");
      });
  }, [id, type, navigate]);

  useEffect(() => {
    requestMedia();
  }, [requestMedia]);

  /* handling favorites */

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFavorites = (media) => {
    dispatch(favoritesRequest(media)).then((data) => {
      console.log(data);
    });
  };

  /* material ui config */
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /* handle loading */
  if (!data.id) {
    return <Loading />;
  }

  return (
    <Card sx={{ width: "100%" }} style={{ borderRadius: 0 }} elevation={0}>
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{ height: 400 }}
          style={{ filter: "brightness(50%)" }}
          image={
            data.poster_path
              ? `https://image.tmdb.org/t/p/original/${data.poster_path}?w=124&fit=crop&auto=format`
              : index
          }
          alt="media poster"
        />
        <div
          style={{
            position: "absolute",
            color: "#EDEEF2",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "1.7em",
            textAlign: "center",
          }}
        >
          {type === "movie" ? `${data.original_title}` : `${data.name}`}
        </div>
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user.id ? (
          <IconButton
            sx={{ color: "#fe4365" }}
            aria-label={`add to favorites`}
            onClick={(e) => {
              e.preventDefault();
              handleFavorites(data);
            }}
          >
            {type === "movie" ? (
              user.favorite_movie.includes(String(data.id)) ? (
                <Favorite />
              ) : (
                <FavoriteBorder />
              )
            ) : user.favorite_tv.includes(String(data.id)) ? (
              <Favorite />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        ) : null}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Type: {type.toUpperCase()}</Typography>
          <Typography paragraph>
            View more on IMDB:{" "}
            {data.imdb_id ? (
              <a
                href={`http://imdb.com/title/${data.imdb_id}`}
                rel="noreferrer"
                target="_blank"
              >
                Click here!
              </a>
            ) : (
              "No info available"
            )}
          </Typography>
          <Typography paragraph>
            Genre:{" "}
            {data.genres
              ? data.genres.map((element) => element.name).join(", ")
              : "No info available"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Movie;
