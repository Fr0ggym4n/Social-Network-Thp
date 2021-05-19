import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const RegisterForm = ({ handleRegistration }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailRegex = /\S+@\S+\.\S+/;

  const isSubmitConditionValid = (
    username.length > 2
    && password.length > 5
    && emailRegex.test(email)
  );

  const handleSubmit = async (event) => {
    if (isSubmitConditionValid) {
      event.preventDefault();
      const userData = {
        username,
        email,
        password,
      };
      handleRegistration(userData);
    }
  };

  return (
    <form className="RegisterForm">
      <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
      <div className='form-inputs'>
      <label className='form-label'>Username</label>
        <input
          className="form-input"
          type="text"
          name="username"
          minLength="3"
          value={username}
          onChange={handleChangeUsername}
          placeholder="Username"
          required
        />
      </div>
      <div className='form-inputs'>
      <label className='form-label'>Email</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
          required
        />
      </div>
      <div className='form-inputs'>
      <label className='form-label'>Password</label>
        <input
          className="form-input"
          type="password"
          name="password"
          minLength="6"
          value={password}
          onChange={handleChangePassword}
          placeholder="Password"
          required
        />
      </div>
      <button className='form-input-btn' type='submit' onClick={handleSubmit} value="Submit">
          Sign up
      </button>
      <span className='form-input-login'>
          Already have an account? Login <Link to='/Login'>here</Link>
      </span>
    </form>
  );
};

export default RegisterForm;