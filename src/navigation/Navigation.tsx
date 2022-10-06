import React from 'react';

import { Error404Page } from 'pages/error404Page/Error404Page';
import { MoviePage } from 'pages/moviePage/MoviePage';
import { MoviesPage } from 'pages/moviesPage/MoviesPage';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PATH } from 'types/enum/Path';

export const Navigation = () => {
  return (
    <Routes>
      <Route element={<Navigate to={PATH.MOVIES} />} path={PATH.INITIAL_ROUTE} />
      <Route element={<MoviesPage />} path={PATH.MOVIES} />
      <Route element={<Outlet />} path={PATH.MOVIE}>
        <Route element={<MoviePage />} path=':movieID' />
      </Route>
      <Route element={<Error404Page />} path={PATH.ERROR_PAGE} />
      <Route element={<Navigate to={PATH.ERROR_PAGE} />} path={PATH.WRONG_PAGE} />
    </Routes>
  );
};
