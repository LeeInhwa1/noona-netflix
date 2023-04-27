import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/MovieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  // 로딩이 true면 loading 스피너를 보여주고
  // 로딩이 false면 데이터를 보여준다

  // true : 데이터 도착 전
  // false : 데이터 도착 후, 에러가 났을 때
  if (loading) {
    return (
      <ClipLoader
        color="#ffff"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  } else {
    return (
      <div>
        {/* 랜더 후 호출되는 useEffect 첫 랜더가 끝난 후 호출되어야 에러가 발생안함 */}
        {/* <Banner movie={popularMovies.results[0]}/> */}

        {/* popularMovies 값이 있어야 호출됨 */}
        {/* {popularMovies.results && <Banner movie={popularMovies.results[0]} />} */}
        <Banner movie={popularMovies.results[0]} />

        <h1>popular Movie</h1>
        <MovieSlide movies={popularMovies} />
        <h1>Top rated Movie</h1>
        <MovieSlide movies={topRatedMovies} />
        <h1>Upcoming Movie</h1>
        <MovieSlide movies={upComingMovies} />
      </div>
    );
  }
};

export default Home;
