# movies-searches

During this assignment, you need to implement automation tests to sample the API app that we created on top of Movies API, and cover the logic of the below three endpoints.

If you choose to write your tests in JS/TS it is recommended to use the app source code and implement the tests under the tests folder.
GitHub repo for cloning the code - https://github.com/gilbendavid/movies-searches.git.

- getAllMoviesTitles - Get all Movies titles as string array if there are results, Or an error message if there is no results to the search value, the input of this endpoint is free text string under the “searchValue” query parameter. (GET method)

Example: 

Request: https://movies-searches.herokuapp.com/getAllMoviesTitles?searchValue=toy

Response: 
{
    "result": [
        "Toy Story",
        "Toy Story 3",
        "Toy Story 2",
        "Toy Story 4",
        "Toy Soldiers",
        "Toy Story of Terror",
        "The Toy",
        "Toy Story That Time Forgot",
        "Tin Toy",
        "Toy Story Toons: Hawaiian Vacation"
    ]
}

	
- getMovieReleasedDate - Get Movie release date, the input of this endpoint is the Movie identifier name/id under the “identifier” query parameter.
The endpoint response is a json with the movie name and release date, Or a error message if there is no results to the identifier.(GET method)

Examples: 

Request: https://movies-searches.herokuapp.com/getMovieReleasedDate?identifier=The Departed

Response: 
{
    "result": {
        "name": "The Departed",
        "releasedYear": "06 Oct 2006"
    }
}

Request: https://movies-searches.herokuapp.com/getMovieReleasedDate?identifier=tt1309379

Response: 
{
    "result": {
        "name": "Sam",
        "releasedYear": "01 Nov 2017"
    }
}

- highestRatingMovie - this endpoint received a json body with movies titles names as strings and return a json object of the  highest rating Movie(by the imdbRating movie field)(POST method)

Example: 

Request: https://movies-searches.herokuapp.com/highestRatingMovie

Request Body: 
{
    "movies": [
      "Titanic",
      "Casino",
      "Looper"
    ]
}

Response Body:
{
    "result": {
        "name": "Casino",
        "rating": "8.2"
    }
}

References: 
- The external API for the assignment application is - https://www.omdbapi.com/

- Postman Collection for the assessment application endpoints (you can import and work locally via postman) 
 
While building this assignment please keep in mind the following:
- Clean code and good separation of layers.
- Modular design, for maintenance and new logic support in the future.
- It's okay if you don't finish it all. Write what you can and we'll discuss it afterward.

Good Luck!!!

