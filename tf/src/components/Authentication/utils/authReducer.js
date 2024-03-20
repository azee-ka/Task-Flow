// authReducer.js
export const initialState = {
    isLoggedIn: false,
    user: null,
  };
  
  export const actionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
  };
  
  const authReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.user,
        };
      case actionTypes.LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  