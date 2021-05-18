import { EDIT_PROFILE } from 'api/apiHandler';
import { useDispatch } from 'react-redux';
import { editUser } from 'store/user/userActions';
import { getAuthenticationCookie } from 'utils/cookieUtils';
import slugify from 'utils/slugify';
import './style.scss';

const EditProfile = (props) => {
  const {
    username,
    email,
    description,
    handleChangeUsername,
    handleChangeDescription,
  } = props;
  const dispatch = useDispatch();

  const isSubmitConditionValid = (
    username.length > 2
      && description.length > 19
  );

  const fetchEditProfile = async (userData) => {
    const token = getAuthenticationCookie();
    const {
      URL,
      METHOD,
      HEADERS,
      BODY,
    } = EDIT_PROFILE(token, userData);

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
      body: BODY,
    });

    const data = await response.json();

    const storeUserData = {
      id: data.id,
      username: data.username,
    };

    dispatch(editUser(storeUserData));
  };

  const handleSubmit = (event) => {
    if (isSubmitConditionValid) {
      event.preventDefault();
      const userData = {
        username,
        description,
        slug: slugify(username),
      };
      fetchEditProfile(userData);
    }
  };

  return (
    <form className="EditProfile">
      <label className="EditProfile__usernameTitle">Username: </label>
      <input
        className="EditProfile__username"
        type="text"
        name="username"
        minLength="3"
        value={username}
        onChange={handleChangeUsername}
        required
      />
      <p className="EditProfile__emailTitle">Email:</p>
      <p className="EditProfile__email">{email}</p>
      <label className="EditProfile__descriptionTitle">Description: </label>
      <textarea
        className="EditProfile__description"
        type="description"
        name="description"
        minLength="20"
        value={description}
        onChange={handleChangeDescription}
        required
      />
      <input className="EditProfile__button" type="submit" onClick={handleSubmit} value="Submit" />
    </form>
  );
};

export default EditProfile;