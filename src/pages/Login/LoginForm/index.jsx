import { useState } from 'react';
import './style.scss';

const LoginForm = ({ handleLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeIdentifier = (event) => {
    setIdentifier(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const isSubmitConditionValid = (
    identifier.length > 2
    && password.length > 5
  );

  const handleSubmit = async (event) => {
    if (isSubmitConditionValid) {
      event.preventDefault();
      const userData = {
        identifier,
        password,
      };
      handleLogin(userData);
    }
  };

  return (
    <form className="LoginForm">
      <input
        className="LoginForm__identifier"
        type="text"
        name="identifier"
        minLength="3"
        value={identifier}
        onChange={handleChangeIdentifier}
        placeholder="Identifier"
        required
      />
      <input
        className="LoginForm__password"
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

export default LoginForm;