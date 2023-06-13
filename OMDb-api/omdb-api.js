const axios = require("axios");

const apiUrl = "http://www.omdbapi.com/?apikey=ed440c27";

/*
Search Movie in OMDb API by free text   
*/
const searchOmdbApi = async (searchValue) => {
  const searchUrl = `${apiUrl}&s=${searchValue}`;
  const res = await axios.get(searchUrl);
  return res?.data;
};

/*
Search Movie in OMDb API by Movie ID(imdbID)  
*/
const searchOmdbApiByMovieId = async (imdbID) => {
  const searchUrl = `${apiUrl}&i=${imdbID}&plot=full`;
  const res = await axios.get(searchUrl);
  return res?.data;
};

/*
Search Movie in OMDb API by Movie Name(Title)
*/
const searchOmdbApiByMovieTitle = async (title) => {
  const searchUrl = `${apiUrl}&t=${title}&plot=full`;
  const res = await axios.get(searchUrl);
  return res?.data;
};

module.exports = {
  searchOmdbApi,
  searchOmdbApiByMovieId,
  searchOmdbApiByMovieTitle,
};
