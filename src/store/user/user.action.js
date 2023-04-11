import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}

export const checkUserSession = () => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
}

export const googleSignInStart = () => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
}

export const emailSignInStart = (email, password) => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
}

export const signInSuccess = (user) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
}

export const signInFailed = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);
}

export const signUpStart = (email, password, displayName) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });
}

export const signUpSuccess = (user, additionalDetails ) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });
}

export const signUpFailure = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);
}

export const signOutStart = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
}

export const signOutSuccess = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
}

export const signOutFailure = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);
}
