import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss';


const CartDropdown = () => {
  const { cartItems, setCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    setCartOpen(false);
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