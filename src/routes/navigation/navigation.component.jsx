import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { useSelector } from 'react-redux';
import { NavigationContainer } from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import CartDropdown from '../../components/card-dropdown/cart-dropdown.component';
import CardIcon from '../../components/card-icon/cart-icon.component';

const Navigation = () => {
  const currentUser  = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <CrownLogo className="logo" />
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">SHOP</Link>
            { currentUser ?
              (<Link className="nav-link" onClick={signOutUser}>SIGN OUT</Link>) :
              (<Link className="nav-link" to="/auth">SIGN IN</Link>)
            }
            <CardIcon />
          </div>
          { isCartOpen && <CartDropdown /> }
        </div>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;