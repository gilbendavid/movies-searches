/// <reference types="cypress" />

describe('movies tests', () => {
  const endpoints = [
    'https://movies-searches.herokuapp.com/getMovieReleasedDate?identifier=The Departed', 
    'https://movies-searches.herokuapp.com/getMovieReleasedDate?identifier=tt1309379', 
    'https://movies-searches.herokuapp.com/getMovieByName?movieName=The Departed',
    'https://movies-searches.herokuapp.com/getMovieById?movieId=tt0407887']
  
  it('Check parameters of movies titles', () => {
    cy.request({
      method: 'GET',
      url: 'https://movies-searches.herokuapp.com/getAllMoviesTitles',
      qs: {
        searchValue: 'toy'
      }
    }).then((response) => {
      expect(response.status).has.eq(200)
      expect(response.body.result).has.lengthOf(10)
      expect(response.body.result[3]).to.eq('Toy Story 4')
      expect(response.body.result).to.include('Toy Story of Terror')
    })
  })

  endpoints.forEach(endpoint => {
    it(`Check movie name and year and rating array ${endpoint}`, () => {
      cy.request('GET', endpoint)
      .then((response) => {
        expect(response.status).has.eq(200)
  
        if(endpoint == endpoints[0]){
          expect(response.body.result).to.has.property('name').and.eq('The Departed')
          expect(response.body.result).to.has.property('releasedYear').and.eq('06 Oct 2006')
        }
        else if(endpoint == endpoints[1]){
          expect(response.body.result).to.has.property('name').and.eq('Sam')
          expect(response.body.result).to.has.property('releasedYear').and.eq('01 Nov 2017')
        }
        else if(endpoint == endpoints[2]){
          response.body.result.Ratings.forEach(rating => {
            expect(rating).to.has.property('Source')
            expect(rating).to.has.property('Value')
          })
        }else{
          response.body.result.Ratings.forEach(rating => {
            expect(rating).to.has.property('Source')
            expect(rating).to.has.property('Value')
          })
        }
      })
    })
  })

  it('Make a post request and validate name and rating', () => {
    cy.request({
      method: 'POST',
      url: 'https://movies-searches.herokuapp.com/highestRatingMovie',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: {
        "movies": [
        "Titanic",
        "Casino",
        "Looper"
        ]
      }     
    }).then((response) => {
      expect(response.status).has.eq(200)
      expect(response.body.result).to.has.property('name').and.eq('Casino')
      expect(response.body.result).to.has.property('rating').and.eq('8.2')
    })
  })
})