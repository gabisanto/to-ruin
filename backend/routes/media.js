const express = require("express");
const moviesController = require("../controllers/moviesController");
const router = express.Router();

router.get("/request/:type/:id", moviesController.requestMedia);
router.get("/search/:input", moviesController.search);
router.get("/movies", moviesController.listMovies);
router.get("/tv", moviesController.listTvShows);

module.exports = router;
