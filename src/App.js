import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.action';
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.componet';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  
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
