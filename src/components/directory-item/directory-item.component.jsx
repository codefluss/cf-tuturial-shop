import './directory-item.styles.scss';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const { id, imageUrl, title } = category;

  const navigateTo = () => navigate(`/shop/${category.title}`);

  return (
    <div className="directory-item-container">
      <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}} />
      <div className="body">
        <h2>{title}</h2>
        <p onClick={navigateTo}>Shop Now</p>
      </div>
    </div>
  )
}

export default DirectoryItem;