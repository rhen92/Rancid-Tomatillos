describe('Spotlight', () => {
  it('it should display Loading if no movies are retrieved', () => {
    cy.visit('http://localhost:3000/')
      .get('h2').contains('Loading')
  });

  it('it should display an error of something went wrong when something goes wrong with the host', () => {
    const spotLightURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919';
    cy.intercept('GET', `${spotLightURL}`, {})
      .visit('http://localhost:3000/')
      .get('a[href*="694919"]').click()
      .get('h3').contains('Something went wrong')

  });

  beforeEach(() => {
    const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/';
    const spotLightURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919';
    cy.intercept('GET', `${baseURL}`, {
      'movies': [
        {
          "id": 694919,
          "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          "title": "Money Plane",
          "average_rating": 6.666666666666667,
          "release_date": "2020-09-29"
        },
        {
          "id": 337401,
          "poster_path": "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
          "title": "Mulan",
          "average_rating": 4.909090909090909,
          "release_date": "2020-09-04"
        },
        {
          "id": 718444,
          "poster_path": "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg",
          "title": "Rogue",
          "average_rating": 5.428571428571429,
          "release_date": "2020-08-20"
        },
    ]
    })
    cy.intercept('GET'), `${spotLightURL}`, {
          "movie": {
          "id": 694919,
          "title": "Money Plane",
          "poster_path": "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          "release_date": "2020-09-29",
          "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
          "genres": [
          "Action"
          ],
          "budget": 0,
          "revenue": 0,
          "runtime": 82,
          "tagline": "",
          "average_rating": 6.142857142857143
          }
        }
  })

  it('a movie should be able to be clicked then display a spotlighted version of a movie', () => {

    cy.visit('http://localhost:3000/')
      cy.get('a[href*="694919"]').click()
        .wait(1000)
        .get('h2').contains('Money Plane')
  });

  it('if a user types in the wrong url it redirects back to the home page', () => {
    cy.visit('http://localhost:3000/fgsdfg')
      .wait(1000)
      .get('article')
  });

});
