import * as APIUtil from '../util/sessionApiUtil';
import jwt_decode from 'jwt-decode';

const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
}