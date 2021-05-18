import './style.scss';

const OtherProfilePost = ({ text, createdAt }) => (
  <div className="OtherProfilePost">
    <p className="OtherProfilePost__text">{text}</p>
    <p><small>{createdAt}</small></p>
  </div>
);

export default OtherProfilePost;