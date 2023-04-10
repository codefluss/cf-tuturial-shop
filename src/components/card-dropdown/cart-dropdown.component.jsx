import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-dropdown.styles.scss';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropdown = () => {
  const dispatch = useDispatch(); 
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    dispatch(setIsCartOpen(false));
    navigate('/checkout');
  };
  
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        { cartItems.length 
          ? (cartItems.map(cartItem => { return <CartItem key={cartItem.id} cartItem={cartItem} />})) 
          : (<span>Your cart is empty</span>)}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;