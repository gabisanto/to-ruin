import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", (data) => {
  return axios
    .post("http://localhost:5000/api/user/login", data)
    .then((res) => res.data);
});

export const sendLogoutRequest = createAsyncThunk("LOGOUT", () => {
  return axios
    .post("http://localhost:5000/api/user/logout")
    .then((err) => {
      console.log(err);
    })
    .catch((err) => console.log("Something happened", err));
});

export const favoritesRequest = createAsyncThunk(
  "ADD_TO_FAVORITES",
  (media, thunkAPI) => {
    const { user } = thunkAPI.getState();
    const media_type = media.original_title ? "movie" : "tv";
    if (!user.id) throw new Error("You need to be logged in");
    return axios
      .put(`http://localhost:5000/api/user/${user.id}/favorite/${media_type}`, {
        id: media.id,
      })
      .then((res) => {
        return res.data;
      });
  }
);

const userReducer = createReducer([], {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fulfilled]: (state, action) => (state = {}),
  [favoritesRequest.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
