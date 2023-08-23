import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SignIn.module.css';
import a from '../../../animations/animations.module.css';
import { signIn } from '../../../redux/auth/authOperations';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IllustrationDesktop from '../../../assets/img/desktop/Illustration.png';
import IllustrationTablet from '../../../assets/img/tablet/Illustration.png';
import IllustrationMobile from '../../../assets/img/mobile/Illustration.png';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth?.error);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm(prevForm => {
      return { ...prevForm, [name]: value };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(signIn(form))
      .unwrap()
      .then(() => navigate('/'))
      .catch(error => {
        toast.error(error.message, {
          theme: 'dark',
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={`${styles.imgContainer} ${a.slideUpToDown}`}>
        <img
          className={`${styles.imgIllustrationDesktop} ${styles.imgIllustration}`}
          src={IllustrationDesktop}
          alt="Illustration"
        />
        <img
          className={`${styles.imgIllustrationTablet} ${styles.imgIllustration}`}
          src={IllustrationTablet}
          alt="Illustration"
        />
        <img
          className={`${styles.imgIllustrationMobile} ${styles.imgIllustration}`}
          src={IllustrationMobile}
          alt="Illustration"
        />
      </div>
      <div className={`${styles.ContainerDiv} ${a.slideDownToUp}`}>
        <h2 className={styles.heading}>Sign In</h2>
        <h3 className={styles.subheading}>
          You need to login to use the service
        </h3>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          <input
            name="email"
            className={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            className={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            Sign In
          </button>
          <Link to="/forgot-password" className={styles.forgotPasswordLink}>
            Forgot your password?
          </Link>
        </form>
        <div className={styles.signupContainer}>
          <p className={styles.signupText}>If you don't have an account yet</p>
          <Link to="/signup" className={styles.signupLink}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
