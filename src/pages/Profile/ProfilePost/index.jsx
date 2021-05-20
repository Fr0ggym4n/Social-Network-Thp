import { DELETE_POST } from 'api/apiHandler';
import { getAuthenticationCookie } from 'utils/cookieUtils';
import './style.scss';

const ProfilePost = (props) => {
  const token = getAuthenticationCookie();

  const {
    text,
    createdAt,
    postId,
    refreshPosts,
  } = props;

  const handleDelete = async () => {
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
    <div className="ProfilePost">
      <div className="ProfilePost__leftBlock">
        <p className="ProfilePost__text">{text}</p>
        <p><small>Posted at: {createdAt}</small></p>
      </div>
      <button className="ProfilePost__delete" type="button" onClick={handleDelete}>delete</button>
    </div>
  );
};

export default ProfilePost;