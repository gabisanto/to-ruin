import React from "react";
import { PersonSearch } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styles from "../styles/simplePages.module.css";

const UserCard = ({ user }) => {
  /* this only creates the user card for the user list */
  return (
    <div className={styles.containerUser}>
      id: {user.id}{" "}
      <Link className={styles.links} to={`/user/${user.id}`}>
        <PersonSearch />
      </Link>
      <br />
      username: {user.username}
      <br />
      mail: {user.email}
    </div>
  );
};

export default UserCard;
