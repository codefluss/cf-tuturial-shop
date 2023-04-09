import { compose, createStore,  applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleWares= [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer,  undefined, composeWithDevTools(composedEnhancers));
