import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Loading from "../commons/Loading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import styles from "../styles/simplePages.module.css";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import gotback from "../assets/gotback.png";
import movieAvatar from "../assets/movieavatar.png";
import { Divider } from "@mui/material";
import tvAvatar from "../assets/tvavatar.png";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

const User = () => {
  /* starting navigate */
  const navigate = useNavigate();

  /* fetching the user and its data from the db */
  const { id } = useParams();
  const [user, setUser] = useState({});

  /* media storage states */
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  /* states to check loading */
  const [fetchingMovies, setFetchingMovies] = useState(true);
  const [fetchingTv, setFetchingTv] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((data) => {
        !data.data.error ? setUser(data.data) : navigate("/404");
      })
      .catch(() => navigate("/404"));
  }, [id]);

  useEffect(() => {
    if (user.id) {
      let { favorite_movie } = user;
      setMovies([]);
      let movieArray = [];
      Promise.all(
        favorite_movie.map((item) =>
          axios
            .get(`http://localhost:5000/api/media/request/movie/${item}`)
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              movieArray.push(data);
            })
        )
      ).then(() => {
        setMovies(movieArray);
        setFetchingMovies(false);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user.id) {
      let { favorite_tv } = user;
      setTv([]);
      let tvArray = [];
      Promise.all(
        favorite_tv.map((item) =>
          axios
            .get(`http://localhost:5000/api/media/request/tv/${item}`)
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              tvArray.push(data);
            })
        )
      ).then(() => {
        setTv(tvArray);
        setFetchingTv(false);
      });
    }
  }, [user]);

  if (fetchingMovies === true || fetchingTv === true || !user.id)
    return <Loading />;

  return (
    <div
      style={{
        backgroundImage: `url(${gotback})`,
      }}
      className={styles.backUser}
    >
      <div>
        <div className={styles.titleFormDiv}>
          <p className={styles.titleForm}>{user.username}'s favorites</p>
        </div>

        <div className={styles.flexCont}>
          {movies.length ? (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                mb: 5,
              }}
            >
              {movies.map((movie, i) => (
                <Link
                  to={`/media/movie/${movie.id}`}
                  className={styles.links}
                  key={i}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="movie avatar" src={movieAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={movie.original_title}
                      secondary={`${movie.overview.slice(0, 30)}...`}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Link>
              ))}
            </List>
          ) : (
            <div
              className={styles.containerUser}
              style={{ marginBottom: 5, alignSelf: "center" }}
            >
              <NotificationImportantIcon /> User has no favorite movies yet!
            </div>
          )}
        </div>
        <div className={styles.flexCont}>
          {tv.length ? (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                mb: 10,
              }}
            >
              {tv.map((show, i) => (
                <Link
                  to={`/media/tv/${show.id}`}
                  className={styles.links}
                  key={i}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="tvshow avatar" src={tvAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={show.name}
                      secondary={`${show.overview.slice(0, 30)}...`}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Link>
              ))}
            </List>
          ) : (
            <div
              className={styles.containerUser}
              style={{ alignSelf: "center", marginBottom: 50 }}
            >
              <NotificationImportantIcon />
              User has no favorite tv shows yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
