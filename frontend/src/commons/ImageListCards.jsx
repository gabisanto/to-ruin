import React from "react";
import { Link } from "react-router-dom";
import index from "../assets/index.png";
import { useDispatch } from "react-redux";
import { favoritesRequest } from "../store/user";
import { ImageListItem, ImageListItemBar, IconButton } from "@mui/material";

import { Favorite, FavoriteBorder } from "@mui/icons-material/";

const ImageListCards = ({ user, type, item }) => {
  const dispatch = useDispatch();

  const handleFavorites = (media) => {
    dispatch(favoritesRequest(media)).then((data) => {
      localStorage.setItem("user", JSON.stringify(data.payload));
    });
  };
  return (
    <Link to={`/media/${type}/${item.id}/`} key={item.id}>
      <ImageListItem>
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/original/${item.poster_path}?w=124&fit=crop&auto=format`
              : index
          }
          srcSet={
            item.poster_path
              ? `https://image.tmdb.org/t/p/original/${item?.poster_path}?w=124&fit=crop&auto=format&dpr=2 2x`
              : index
          }
          alt={type === "movie" ? item.original_title : item.name}
          loading="lazy"
        />
        <ImageListItemBar
          title={type === "movie" ? item.original_title : item.name}
          subtitle={item.overview.slice(0, 80) + "..."}
          actionIcon={
            user.id ? (
              <IconButton
                animated={false}
                sx={{ color: "#fe4365" }}
                aria-label={`add to favorites`}
                onClick={(e) => {
                  e.preventDefault();
                  handleFavorites(item);
                }}
              >
                {type === "movie" ? (
                  user.favorite_movie.includes(String(item.id)) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )
                ) : user.favorite_tv.includes(String(item.id)) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            ) : null
          }
        />
      </ImageListItem>
    </Link>
  );
};

export default ImageListCards;
