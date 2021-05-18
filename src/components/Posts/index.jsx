import { GET_POSTS, POSTS_COUNT } from 'api/apiHandler';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAuthentication, getAuthenticationCookie } from 'utils/cookieUtils';
import CreatePost from './CreatePost';
import Post from './Post';
import './style.scss';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const currentUser = useSelector((state) => state.info);

  const fetchPosts = async () => {
    const {
      URL,
      METHOD,
      HEADERS,
    } = GET_POSTS;

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
    });

    const data = await response.json();

    const dataPosts = data.map((post) => {
      const {
        id,
        text,
        created_at,
        user,
      } = post;

      const postUserData = {
        id: user.id,
        username: user.username,
        slug: user.slug,
      };

      return {
        id,
        text,
        created_at,
        user: postUserData,
      };
    });

    setPosts(dataPosts);
  };

  const fetchPostsCount = async () => {
    const token = getAuthenticationCookie();

    const {
      URL,
      METHOD,
      HEADERS,
    } = POSTS_COUNT(token);

    const response = await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
    });

    const count = await response.json();

    setPostsCount(count);
  };

  useEffect(() => {
    fetchPosts();
    if (checkAuthentication()) fetchPostsCount();
    // Update the posts every minute
    setInterval(() => {
      fetchPosts();
      if (checkAuthentication()) fetchPostsCount();
    }, 60000);
  }, []);

  return (
    <div className="Posts">
      {currentUser.username && (
        <CreatePost refreshPosts={fetchPosts} />
      )}
      {!currentUser.username && (
        <p className="Posts__publicMessage">
          <Link to="/login">Log in</Link> or <Link to="/register">sign up</Link> to create a post!
        </p>
      )}
      <h2 className="Posts__title">List of posts {currentUser.username && (`(${postsCount} in total)`)}</h2>
      {posts && (posts.map((post) => (
        <Post
          id={post.user.id}
          slug={post.user.slug}
          username={post.user.username}
          text={post.text}
          createdAt={post.created_at}
          refreshPosts={fetchPosts}
          postId={post.id}
          key={post.id}
        />
      )))}
    </div>
  );
};

export default Posts;