const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {
  getAllMoviesTitles,
  getMovieReleasedDate,
  getHighestRatingMovie,
  getMovieByName,
  getMovieById,
} = require("./movies-functions");
const PORT = process.env.PORT || 5555;

app.get("/", (req, res) => {
  res.send("Movies Searches Server is Up!!!");
  console.log("Movies Searches Server is Up!!!");
});

app.get("/getMovieByName", async (req, res) => {
  if (!req.query.movieName) {
    res.status(400).send({ massage: "Movie Name is missing" });
    return;
  }
  const result = await getMovieByName(req.query.movieName);
  console.log(
    `getMovieByName movieName=${
      req.query.searchValue
    } - Result=${JSON.stringify(result)}`
  );
  res.status(200).send({ result });
});

app.get("/getMovieById", async (req, res) => {
  if (!req.query.movieId) {
    res.status(400).send({ massage: "Movie Id is missing" });
    return;
  }
  const result = await getMovieById(req.query.movieId);
  console.log(
    `getMovieById movieId=${req.query.searchValue} - Result=${JSON.stringify(
      result
    )}`
  );
  res.status(200).send({ result });
});

app.get("/getAllMoviesTitles", async (req, res) => {
  if (!req.query.searchValue) {
    res.status(400).send({ massage: "Search value is missing" });
    return;
  }
  const result = await getAllMoviesTitles(req.query.searchValue);
  console.log(
    `getAllMoviesTitles searchValue=${req.query.searchValue} - Result=${result}`
  );
  res.status(200).send({ result });
});

app.get("/getMovieReleasedDate", async (req, res) => {
  if (!req.query.identifier) {
    res.status(400).send({ massage: "identifier is missing" });
    return;
  }
  const result = await getMovieReleasedDate(req.query.identifier);
  console.log(
    `getMovieReleasedDate identifier=${
      req.query.identifier
    } - Result=${JSON.stringify(result)}`
  );
  res.status(200).send({ result });
});

app.post("/highestRatingMovie", async (req, res) => {
  if (!req?.body?.movies || req.body.movies.length === 0) {
    res.status(400).send({ massage: "Movies list is missing" });
    return;
  }
  const result = await getHighestRatingMovie(req.body.movies);
  console.log(
    `highestRatingMovie - Movies=${req.body.movies} - Result=${JSON.stringify(
      result
    )}`
  );
  res.status(200).send({ result });
});

const start = async () => {
  try {
    app
      .listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      })
      .on("error", (err) => {
        console.log("Server failed", {}, err);
      });
  } catch (err) {
    console.log("Failed starting app", {}, err);
  }
};

void start();
