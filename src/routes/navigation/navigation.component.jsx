import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext, useState } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/card-dropdown/cart-dropdown.component';
import CardIcon from '../../components/card-icon/cart-icon.component';

import { NavigationContainer } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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