import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Results from "./components/Results";
import Profile from "./components/Profile";
import Movie from "./components/Movie";
import Favorites from "./components/Favorites";
import User from "./components/User";
import Users from "./components/Users";
import { useSelector } from "react-redux";

const App = () => {
  /* const user = JSON.parse(localStorage.getItem("user")); */

  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="404" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="results" element={<Results />} />
          {user.id && <Route path="favorites" element={<Favorites />} />}
          {user.id && <Route path="profile" element={<Profile />} />}
          <Route path="user/:id" element={<User />} />
          <Route path="users" element={<Users />} />
          <Route path="media/:type/:id" element={<Movie />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
