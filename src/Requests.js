import { genres } from "./genres";

export const key = process.env.REACT_APP_TMDB_KEY;

export const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  /* requestGenres: genres.movies.map((genre, index) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genre.id}`;
  }), */
  requestHorror: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const tvSeriesRequests = {
  requestPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`,
  requestGenres: genres.tvSeries.map((genre, index) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genre.id}`;
  }),
  requestOnGoing: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1`,
};

console.log(tvSeriesRequests.requestLatest);

/* https://api.themoviedb.org/3/movie/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false */
