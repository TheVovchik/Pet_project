/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
