import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthUser } from '../../redux/auth/authSlice';
import SettingsPage from 'pages/Settings/SettingsPage';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = localStorage.getItem('user_data');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      dispatch(updateAuthUser(parsedAuthData));
    }
  }, [dispatch]);

  const isAuth = useSelector(state => state.auth.token);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAuth ? <MainPage /> : <MainAuth />} />
          <Route
            path="/signin"
            element={<PublicRoute component={<SignIn />} redirect="/" />}
          />
          <Route
            path="/signup"
            element={
              <PublicRoute component={<SignUp />} redirect="/mainpage" />
            }
          />
          <Route path="/signup/:params" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPass />} />

          <Route
            path="recomended-food"
            element={<PrivateRoute component={<RecomendedFood />} />}
          />

          <Route
            path="/diary"
            element={<PrivateRoute component={<Diary />} redirect={'/diary'} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute component={<SettingsPage />} />}
          />
          <Route path="*" element={isAuth ? <MainPage /> : <MainAuth />} />
        </Route>
      </Routes>
    </>
  );
};
