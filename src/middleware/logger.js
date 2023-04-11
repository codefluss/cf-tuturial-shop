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