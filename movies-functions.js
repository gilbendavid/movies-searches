const {
  searchOmdbApi,
  searchOmdbApiByMovieId,
  searchOmdbApiByMovieTitle,
} = require("./OMDb-api/omdb-api");

/**
 * getAllMoviesTitles
 * @param {} searchValue
 * @returns Array of Movies/Series
 */
const getAllMoviesTitles = async (searchValue) => {
  const result = await searchOmdbApi(searchValue);
  if (result.Response === "False") {
    return result.Error;
  }
  return result.Search.map((m) => m.Title);
};

/**
 * getMovieReleasedDate
 * @param {} identifier
 * @returns The movie name and released date
 */
const getMovieReleasedDate = async (identifier) => {
  let movie = await getMovieReleasedDateByMovieTitle(identifier);
  if (movie?.name) {
    return movie;
  }
  movie = await getMovieReleasedDateByMovieId(identifier);
  return movie;
};

/**
 * getHighestRatingMovie
 * @param {*} moviesList
 * @returns The highest rating Movie(imdbRating)
 */
const getHighestRatingMovie = async (moviesList) => {
  if (!moviesList || moviesList.length === 0) {
    return "Movies List is missing!";
  }
  const movies = [];
  for (const movie of moviesList) {
    const movObj = await getMovieByName(movie);
    movies.push({ name: movObj?.Title, rating: movObj?.imdbRating });
  }
  const highestRating = Math.max(...movies.map((m) => m.rating));
  const highestRatingMovie = movies.find(
    (m) => parseFloat(m.rating) === highestRating
  );
  return highestRatingMovie;
};

const getMovieReleasedDateByMovieTitle = async (movieTitle) => {
  const movie = await getMovieByName(movieTitle);
  if (!movie || movie.Response === "False") {
    return movie?.Error;
  }
  return { name: movie?.Title, releasedYear: movie?.Released };
};

const getMovieReleasedDateByMovieId = async (movieId) => {
  const movie = await getMovieById(movieId);
  if (!movie || movie.Response === "False") {
    return movie?.Error;
  }
  return { name: movie?.Title, releasedYear: movie?.Released };
};

const getMovieByName = async (title) => {
  const result = await searchOmdbApiByMovieTitle(title);
  return result;
};

const getMovieById = async (id) => {
  const result = await searchOmdbApiByMovieId(id);
  return result;
};

module.exports = {
  getAllMoviesTitles,
  getMovieReleasedDate,
  getHighestRatingMovie,
  getMovieByName,
  getMovieById,
};
