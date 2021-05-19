import { GET_USER, GET_USER_POSTS } from 'api/apiHandler';
import Config from 'config';
import { useEffect, useState } from 'react';
import { getAuthenticationCookie } from 'utils/cookieUtils';
import OtherProfilePost from './OtherProfilePost';
import './style.scss';

const OtherProfile = () => {
  const userId = localStorage.getItem(Config.STORAGE_USER_ID_KEY);
  const token = getAuthenticationCookie();

  const [user, setUser] = useState({
    id: null,
    username: '',
    description: '',
  });

  const [posts, setPosts] = useState([]);

  const fetchUserData = async () => {
    const {
      URL,
      METHOD,
      HEADERS,
    } = GET_USER(token, userId);

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
    });

    const data = await response.json();

    const {
      id,
      username,
      description,
    } = data;

    setUser({
      id,
      username,
      description,
    });
  };

  const fetchUserPosts = async () => {
    const {
      URL,
      METHOD,
      HEADERS,
    } = GET_USER_POSTS(token, userId);

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
    });

    const data = await response.json();

    const userPosts = data.map((post) => {
      const { id, text, created_at } = post;
      return {
        id,
        text,
        created_at,
      };
    });

    setPosts(userPosts);
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, );

  return (
    <div className="OtherProfile">
      <h3 className="OtherProfile__username">{user.username}&apos;s profile</h3>
      <p className="OtherProfile__descriptionTitle"><strong>Description:</strong></p>
      <p className="OtherProfile__descriptionContent">{user.description}</p>

      <h3>List of posts:</h3>
      {posts.length === 0 && (
        <p className="OtherProfile__noPost">No post YET!</p>
      )}
      {posts.length > 0 && (
        posts.map((post) => (
          <OtherProfilePost
            text={post.text}
            createdAt={post.created_at}
            key={post.id}
          />
        ))
      )}
    </div>
  );
};

export default OtherProfile;