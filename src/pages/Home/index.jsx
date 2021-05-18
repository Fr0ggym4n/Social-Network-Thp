import Posts from 'components/Posts';
import { useSelector } from 'react-redux';
import './style.scss';

const Home = () => {
  const currentUser = useSelector((state) => state.info);
  const { username } = currentUser;

  return (
    <div className="Home">
      <p className="Home__description">Welcome on <strong>M&C Social Network</strong>. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
      {username && (
        <>
          <p className="Home__hello">Hello {username}!</p>
        </>
      )}
      <Posts />
    </div>
  );
};

export default Home;