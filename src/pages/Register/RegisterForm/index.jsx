import { useState } from 'react';
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
      <input
        className="RegisterForm__username"
        type="text"
        name="username"
        minLength="3"
        value={username}
        onChange={handleChangeUsername}
        placeholder="Username"
        required
      />
      <input
        className="RegisterForm__email"
        type="email"
        name="email"
        value={email}
        onChange={handleChangeEmail}
        placeholder="Email"
        required
      />
      <input
        className="RegisterForm__password"
        type="password"
        name="password"
        minLength="6"
        value={password}
        onChange={handleChangePassword}
        placeholder="Password"
        required
      />
      <input type="submit" onClick={handleSubmit} value="Submit" />
    </form>
  );
};

export default RegisterForm;