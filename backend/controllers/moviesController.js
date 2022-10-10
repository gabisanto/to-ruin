const axios = require("axios");

module.exports = {
  listMovies: (req, res) => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=712a025ab24965249dc20bc519201c06&language=en-US&sort_by=popularity.desc&page=1"
      )
      .then((data) => res.send(data.data.results.slice(0, 10)));
  },
  listTvShows: (req, res, next) => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=712a025ab24965249dc20bc519201c06&language=en-US&sort_by=popularity.desc&page=1"
      )
      .then((data) => res.send(data.data.results.slice(0, 10)));
  },
  requestMedia: (req, res, next) => {
    let { type, id } = req.params;
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=712a025ab24965249dc20bc519201c06&language=en-US`
      )
      .then((data) => res.send(data.data))
      .catch((err) => res.sendStatus(404));
  },
  search: (req, res, next) => {
    const { input } = req.params;
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=712a025ab24965249dc20bc519201c06&language=en-US&query=${input}&page=1`
      )
      .then((data) => res.send(data.data.results))
      .catch((err) => console.log(err));
  },
};
