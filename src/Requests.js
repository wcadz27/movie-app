export const key = process.env.REACT_APP_TMDB_KEY;

var utc = new Date().toJSON().slice(0, 10);

console.log(`${utc}`);

export const requests = {
  //TODO: For genre: to be able to dynamically request from links on the same selection
  // i.e. selection from page 1 then page 2 until it reaches the demand amount of movie which is maybe 30
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const tvSeriesRequests = {
  requestPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`,
  requestOnGoing: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1`,
};

export function requestGenre(selection, show, genreID) {
  if (show === "isTVSeries") {
    switch (selection) {
      case "Popular":
        return `https://api.themoviedb.org/3/discover/tv?api_key=${key}&sort_by=popularity.desc&with_genres=${genreID}`;

      case "Top rated":
        return `https://api.themoviedb.org/3/discover/tv?api_key=${key}&sort_by=vote_average.desc&with_genres=${genreID}`;

      case "New Releases":
        return `https://api.themoviedb.org/3/discover/tv?api_key=${key}&first_air_date.desc&first_air_date.lte=${utc}&with_genres=${genreID}`;

      case "Upcoming":
        return `https://api.themoviedb.org/3/discover/tv?api_key=${key}&first_air_date.asc&first_air_date.gte=${utc}&with_genres=${genreID}`;
      default:
        console.log(selection);
    }
  } else if (show === "isMovie") {
    switch (selection) {
      case "Popular":
        return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc&with_genres=${genreID}`;

      case "Top Rated":
        return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=vote_average.desc&with_genres=${genreID}`;

      case "New Releases":
        return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&primary_release_date.desc&primary_release_date.lte=${utc}&with_genres=${genreID}`;

      case "Upcoming":
        return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&primary_release_date.asc&primary_release_date.gte=${utc}&with_genres=${genreID}`;
      default:
        console.log(selection);
    }
  } else {
    switch (selection) {
      case "Popular":
        return [
          `https://api.themoviedb.org/3/discover/tv?api_key=${key}&sort_by=popularity.desc&with_genres=${genreID}`,
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc&with_genres=${genreID}`,
        ];

      case "Top Rated":
        return [
          `https://api.themoviedb.org/3/discover/tv?api_key=${key}&sort_by=vote_average.desc&with_genres=${genreID}`,
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=vote_average.desc&with_genres=${genreID}`,
        ];

      case "New Releases":
        return [
          `https://api.themoviedb.org/3/discover/tv?api_key=${key}&first_air_date.desc&first_air_date.lte=${utc}&with_genres=${genreID}`,
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&primary_release_date.desc&primary_release_date.lte=${utc}&with_genres=${genreID}`,
        ];

      case "Upcoming":
        return [
          `https://api.themoviedb.org/3/discover/tv?api_key=${key}&first_air_date.asc&first_air_date.gte=${utc}&with_genres=${genreID}`,
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&primary_release_date.asc&primary_release_date.gte=${utc}&with_genres=${genreID}`,
        ];
      default:
        console.log(selection);
    }
  }
}

export const showInfo = (showID, showType) => {
  return showType === "movie"
    ? [
        `https://api.themoviedb.org/3/movie/${showID}/credits?api_key=${key}&language=en-US`,
        `https://api.themoviedb.org/3/movie/${showID}/videos?api_key=${key}&language=en-US`,
        `https://api.themoviedb.org/3/movie/${showID}/similar?api_key=${key}&language=en-US&page=1`,
      ]
    : [
        `https://api.themoviedb.org/3/tv/${showID}/credits?api_key=${key}&language=en-US`,
        `https://api.themoviedb.org/3/tv/${showID}/videos?api_key=${key}&language=en-US`,
        `https://api.themoviedb.org/3/tv/${showID}/similar?api_key=${key}&language=en-US&page=1`,
      ];
};

/* const castsRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/credits?api_key=${key}&language=en-US`;
const trailerRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/videos?api_key=${key}&language=en-US`;
const similarMoviesRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/similar?api_key=${key}&language=en-US&page=1`;
 */
