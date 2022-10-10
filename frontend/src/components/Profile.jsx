import React from "react";
import { Link } from "react-router-dom";
import profileBack from "../assets/profileback.jpg";
import { useSelector } from "react-redux";
import styles from "../styles/simplePages.module.css";
import { Favorite, Home, Person } from "@mui/icons-material";

const Profile = () => {
  /* catching user from global state */
  const user = useSelector((state) => state.user);
  return (
    <div
      style={{
        backgroundImage: `url(${profileBack})`,
      }}
      className={styles.backImg}
    >
      <div className={styles.titleFormDiv}>
        <p className={styles.titleForm}>My profile</p>
      </div>
      <div className={styles.container}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          Hello, {user.username}! ٩(◕‿◕)۶
        </div>
        <Link to="/favorites" className={styles.links}>
          <p>
            <Favorite /> My Favorites
          </p>
        </Link>
        <Link to="/" className={styles.links}>
          <p>
            <Home /> Home
          </p>
        </Link>
        <Link to="/users" className={styles.links}>
          <p>
            <Person /> Users
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
