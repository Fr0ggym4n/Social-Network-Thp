import { DELETE_POST } from 'api/apiHandler';
import Config from 'config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthenticationCookie } from 'utils/cookieUtils';
import './style.scss';

const Post = (props) => {
  const {
    username,
    text,
    createdAt,
    slug,
    id,
    refreshPosts,
    postId,
  } = props;

  const currentUser = useSelector((state) => state.info);

  const handleStoreId = () => {
    localStorage.setItem(Config.STORAGE_USER_ID_KEY, `${id}`);
  };

  const handleDelete = async () => {
    const token = getAuthenticationCookie();

    const {
      URL,
      METHOD,
      HEADERS,
    } = DELETE_POST(token, postId);

    await fetch(URL, {
      method: METHOD,
      headers: HEADERS,
    });

    refreshPosts();
  };

  return (
    <div className="Post">
      {currentUser.username && (
        <div className="Post__header">
          <Link
            to={`/user/${slug}`}
            className="Post__username"
            onClick={handleStoreId}
          >
            {username}
          </Link>
          {currentUser.username === username && (
            <button
              type="button"
              className="Post__delete"
              onClick={handleDelete}
            >
              delete
            </button>
          )}
        </div>
      )}
      <p className="Post__text">{text}</p>
      <small>created at: {createdAt}</small>
    </div>
  );
};

export default Post;