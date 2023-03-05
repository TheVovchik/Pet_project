/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPanel } from '../pages/AdminPanel';
import { ContactsPage } from '../pages/ContactsPage';
import { HomePage } from '../pages/HomePage';
import { SignIn } from '../pages/SignIn';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="contacts" element={<ContactsPage />} />
      <Route path="auth" element={<SignIn />} />
      <Route path="admin" element={<AdminPanel />} />
    </Routes>
  );
};
