const {
  getAllMoviesTitles,
  getMovieReleasedDate,
  getHighestRatingMovie,
} = require("./movies-functions");

const start = async () => {
  try {
    const allMovies = await getAllMoviesTitles("toy");
    console.log(JSON.stringify(allMovies));

    const releasedDateByID = await getMovieReleasedDate("tt1276878");
    const releasedDateByName = await getMovieReleasedDate("The Departed");
    console.log(JSON.stringify(releasedDateByID));
    console.log(JSON.stringify(releasedDateByName));

    const highestRatingMovie = await getHighestRatingMovie([
      "Titanic",
      "Casino",
      "Looper",
    ]);
    console.log(JSON.stringify(highestRatingMovie));
  } catch (err) {
    console.error("An error occurred while running the application", err);
  }
};

void start();
