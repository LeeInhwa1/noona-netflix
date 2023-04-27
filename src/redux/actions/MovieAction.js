import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;
function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_MOVIES_REQUEST",
      });
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const topRatedMovieApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1";`
      );

      const upComingMovieApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      let [popularMovies, topRatedMovies, upComingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedMovieApi,
          upComingMovieApi,
          genreApi,
        ]); // 전부 동시에 호출함 3개의 데이터가 전부 리턴될 때 까지만 기다림

      console.log("genreList", genreList);
      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upComingMovies: upComingMovies.data,
          loading: false,
          genreList: genreList.data.genres,
        },
      });
      // console.log("popularMovies", popularMovies);
      // console.log("topRatedMovies", topRatedMovies);
      // console.log("upComingMovies", upComingMovies);
    } catch (error) {
      // 에러 핸들링 하는 곳
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}
export const movieAction = {
  getMovies,
};
