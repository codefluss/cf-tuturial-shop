import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

import './cart.icon.styles.scss';

const CardIcon = () => {
  const { isCartOpen, setCartOpen, cartCount } = useContext(CartContext);

  const toggleCartOpen = () => setCartOpen(!isCartOpen);
  
  
  return (
    <div className="cart-icon-container" onClick={toggleCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CardIcon;