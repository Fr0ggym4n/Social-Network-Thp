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
      <h1>
          Get started with us today! Sign in your account by filling out the
          information below.
      </h1>
      <div className='form-inputs'>
      <label className='form-label'>Email</label>
        <input
          className="form-input"
          type="text"
          name="identifier"
          minLength="3"
          value={identifier}
          onChange={handleChangeIdentifier}
          placeholder="Identifier"
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
          Sign in
      </button>
    </form>
  );
};

export default LoginForm;