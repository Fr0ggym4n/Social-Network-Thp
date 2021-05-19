/* eslint-disable react-hooks/exhaustive-deps */
import { GET_USER_POSTS, OWN_PROFILE } from 'api/apiHandler';
import { useSelector } from 'react-redux';
import { getAuthenticationCookie } from 'utils/cookieUtils';
import { useEffect, useState } from 'react';
import './style.scss';
import EditProfile from './EditProfile';
import ProfilePost from './ProfilePost';

const Profile = () => {
  const globalState = useSelector((state) => (state));
  const { info: currentUser } = globalState;
  const [editProfileUsername, setEditProfileUsername] = useState('');
  const [editProfileEmail, setEditProfileEmail] = useState('');
  const [editProfileDescription, setEditProfileDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const token = getAuthenticationCookie();

  const fetchOwnProfile = async () => {
    const {
      URL,
      METHOD,
      HEADERS,
    } = OWN_PROFILE(token);

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
    });

    const data = await response.json();

    return {
      username: data.username,
      email: data.email,
      description: data.description,
    };
  };

  useEffect(async () => {
    const {
      username,
      email,
      description,
    } = await fetchOwnProfile();

    setEditProfileUsername(username);
    setEditProfileEmail(email);
    setEditProfileDescription(description || 'No description yet!');
  }, [globalState]);

  const handleChangeUsername = (event) => {
    setEditProfileUsername(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setEditProfileDescription(event.target.value);
  };

  const fetchUserPosts = async () => {
    const {
      URL,
      METHOD,
      HEADERS,
    } = GET_USER_POSTS(token, currentUser.id);

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
    fetchUserPosts();
  }, []);

  return (
    <div className="Profile">
      <h1 className="Profile__title">My profile</h1>
      <EditProfile
        username={editProfileUsername}
        email={editProfileEmail}
        description={editProfileDescription}
        handleChangeUsername={handleChangeUsername}
        handleChangeDescription={handleChangeDescription}
      />
      <hr className="Profile__separator" />
      <h2 className="Profile__postsTitle">My precious posts</h2>
      {posts.length === 0 && (
        <p className="Profile__noPost">No post YET!</p>
      )}
      {posts.length > 0 && (
        posts.map((post) => (
          <ProfilePost
            text={post.text}
            createdAt={post.created_at}
            postId={post.id}
            refreshPosts={fetchUserPosts}
            key={post.id}
          />
        ))
      )}
    </div>
  );
};

export default Profile;