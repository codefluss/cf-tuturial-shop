import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';

import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.componet';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.reducer';


const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    return onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      const pickedUser = user && (({ accessToken, email, displayName }) => 
        ({ accessToken, email, displayName }))(user);
      
      dispatch(setCurrentUser(pickedUser));
    });
  }, [dispatch]);
  
  return (
    <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="/shop/*" element={<Shop />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/checkout" element={<Checkout />} />
        </Route>
    </Routes>
  );
}

export default App;
