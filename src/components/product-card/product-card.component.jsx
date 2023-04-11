import Button from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';

import './product-card.styles.scss';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.reducer';


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price } = product;

  const addProductToCart = (product) => dispatch(addItemToCart(product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name}/>
      <div className="footer">
        <span className="name">{ name }</span>
        <span className="price">{ price }</span>
      </div>
      <Button onClick={() => addProductToCart(product)} buttonType="inverted">Add to card</Button>
    </div>
  );
}

export default ProductCard;