import { compose, createStore,  applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const loggerMiddleWare = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  
  console.log('type: ', action.type);
  console.log('action: ', action.payload);
  console.log('current state: ', store.getState());
  
  next(action);
  console.log('next state: ', store.getState());
  return next(action);
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares= [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer,  undefined, composeWithDevTools(composedEnhancers));

export const persistor = persistStore(store);
