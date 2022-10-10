import React from "react";
import images from "../assets";
import styles from "../styles/simplePages.module.css";

const NotFound = () => {
  /* getting an array with only the image paths */
  const pureImages = Object.values(images).map((object) => object.default);

  /* randomizing to get a different one each reload */
  let randomPic = pureImages[Math.floor(Math.random() * pureImages.length)];

  return (
    <div
      style={{
        backgroundImage: `url(${randomPic})`,
      }}
      className={styles.backNotFound}
    >
      <p className={styles.textNotFound}>
        <span style={{ fontWeight: "bold", fontSize: 40 }}>Oops!</span> <br />
        It's one of those 404 pages! You can go{" "}
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "#774f38",
            fontWeight: "bold",
          }}
        >
          home
        </a>
        , maybe{" "}
        <a
          href="/login"
          style={{
            textDecoration: "none",
            color: "#774f38",
            fontWeight: "bold",
          }}
        >
          login
        </a>
        , or just relax and watch a movie with us!
      </p>
    </div>
  );
};

export default NotFound;
