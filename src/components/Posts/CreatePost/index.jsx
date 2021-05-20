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
    <div className="content home-content">
    <form className="CreatePost">
      <textarea className="CreatePost__input" value={value} onChange={handleChangeValue} placeholder="Write down a post" />      
      <button className='form-input-btn home-post' type='submit' onClick={handleSubmit} value="Submit">
          Post
          {loading && (
        <p>We are sending your post {currentUser.username}…</p>
      )}
      </button>
    </form>
    </div>
  );
};

export default CreatePost;