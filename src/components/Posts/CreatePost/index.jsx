import { CREATE_POST } from 'api/apiHandler';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthenticationCookie } from 'utils/cookieUtils';
import './style.scss';

const CreatePost = ({ refreshPosts }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.info);

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const fetchCreatePost = async () => {
    setLoading(true);
    const token = getAuthenticationCookie();
    const sendData = {
      text: value,
      user: currentUser.id,
    };

    const {
      URL,
      METHOD,
      HEADERS,
      BODY,
    } = CREATE_POST(token, sendData);

    await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
      body: BODY,
    });

    setLoading(false);
    refreshPosts();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCreatePost();
  };

  return (
    <form className="CreatePost">
      <textarea className="CreatePost__input" value={value} onChange={handleChangeValue} placeholder="Write down a post" />
      <input className="CreatePost__submit" type="submit" value="Post" onClick={handleSubmit} />
      {loading && (
        <p>We are sending your post {currentUser.username}…</p>
      )}
    </form>
  );
};

export default CreatePost;