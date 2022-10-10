import axios from "axios";
import { React, useState, useEffect } from "react";
import Loading from "../commons/Loading";
import styles from "../styles/simplePages.module.css";
import jurassic from "../assets/jurassic.png";

import UserCard from "./UserCard";

const Users = () => {
  /* starting the user state and grabbing data from db */
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return axios
      .get("http://localhost:5000/api/user/list")
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

  /* shows loading animation if fetching isn't done */
  if (!users.length) return <Loading />;

  /* sorting the user list by id number */
  let sortedUsers = users.sort((a, b) => a.id - b.id);
  return (
    <div
      style={{
        backgroundImage: `url(${jurassic})`,
      }}
      className={styles.backImgBig}
    >
      <div className={styles.titleFormDiv}>
        <p className={styles.titleForm}>Users list</p>
      </div>
      <div className={styles.flexCont}>
        {sortedUsers.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default Users;
