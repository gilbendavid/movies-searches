const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {
  getAllMoviesTitles,
  getMovieReleasedDate,
  getHighestRatingMovie,
} = require("./movies-functions");
const port = 5555;

app.get("/", (req, res) => {
  res.send("Movies Searches Server is Up!!!");
  console.log("Movies Searches Server is Up!!!");
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

app.post("/getHighestRatingMovie", async (req, res) => {
  if (!req?.body?.movies || req.body.movies.length === 0) {
    res.status(400).send({ massage: "Movies list is missing" });
    return;
  }
  const result = await getHighestRatingMovie(req.body.movies);
  console.log(
    `getHighestRatingMovie - Movies=${
      req.body.movies
    } - Result=${JSON.stringify(result)}`
  );
  res.status(200).send({ result });
});

const start = async () => {
  try {
    app
      .listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      })
      .on("error", (err) => {
        console.log("Server failed", {}, err);
      });
  } catch (err) {
    console.log("Failed starting app", {}, err);
  }
};

void start();
