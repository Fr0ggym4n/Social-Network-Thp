import Posts from 'components/Posts';
import { useSelector } from 'react-redux';
import './style.scss';

const Home = () => {
  const currentUser = useSelector((state) => state.info);
  const { username } = currentUser;

  return (
    <div className="Home">
      <h1 className="Home__description">Welcome on <strong className="Home__title"> Twitter-Like Network</strong>. This website is a training to Redux and React. We use auth and routing to create a small social media website.</h1>
      {username && (
        <>
          <h3 className="Home__hello">Hello {username}!</h3>
        </>
      )}
      <Posts />
    </div>
  );
};

export default Home;