import { React } from "react";
import styles from "../styles/simplePages.module.css";
import stranger from "../assets/stranger.png";
import useMatches from "../hooks/useMatches";
import ImageListCards from "../commons/ImageListCards";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { ImageList, ImageListItem, ListSubheader } from "@mui/material";

const Results = () => {
  /* media query using a custom hook */
  const matches = useMatches();

  /* catching the user from global state to handle favorites if they're logged in */
  const user = useSelector((state) => state.user);

  /* grabbing the results and filtering only tvshows and movies */
  const {
    state: { results },
  } = useLocation();
  const media = results.filter((item) => item.media_type !== "person");

  return (
    <div
      style={{
        backgroundImage: `url(${stranger})`,
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
            {media.length > 0
              ? `Showing ${media.length} results`
              : "No results"}
          </ListSubheader>
        </ImageListItem>
        {media.map((item, i) => (
          <ImageListCards
            user={user}
            type={item.media_type}
            key={i}
            item={item}
          />
        ))}
      </ImageList>
    </div>
  );
};

export default Results;
