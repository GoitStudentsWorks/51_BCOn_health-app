import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Diary from '../Diary/Diary';
import Layout from '../Layout/Layout';
import RecomendedFood from '../RecomendedFood/RecomendedFood';
import MainAuth from '../../pages/Auth/MainAuth/MainAuth';
import SignupForm from 'components/SignupForm/SignupForm';
import MainPage from 'pages/MainPage/MainPage';
import SignIn from '../../pages/Auth/SignIn/SignIn';
import SignUp from '../../pages/Auth/SignUp/SignUp';
import ForgotPass from '../../pages/Auth/ForgotPass/ForgotPass';
import PublicRoute from 'containers/PublicRoute.jsx';
import PrivateRoute from 'containers/PrivateRoute';
import Settings from 'components/Settings/Settings';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainAuth />} />
          <Route
            path="/signin"
            element={
              <PublicRoute component={<SignIn />} redirect="/mainpage" />
            }
          />
          <Route
            path="/mainpage"
            element={<PrivateRoute component={<MainPage />} />}
          />
          {/* <Route path="/signin" element={<SignIn />} /> */}
          <Route
            path="/signup"
            element={
              <PublicRoute component={<SignUp />} redirect="/mainpage" />
            }
          />
          <Route path="/signup/:params" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPass />} />

          <Route
            path="/recomendedFood"
            element={<PrivateRoute component={<RecomendedFood />} />}
          />

          <Route path="/diary" element={<Diary />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<MainAuth />} />
        </Route>
      </Routes>
    </>
  );
};
