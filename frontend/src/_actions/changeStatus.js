export const LOGIN_CHECK = "LOGIN_CHECK";
export const LOGOUT_CHECK = "LOGOUT_CHECK";

export const loginCheck = () => {
  return {
    type: LOGIN_CHECK,
  };
};

export const logoutCheck = () => {
  return {
    type: LOGOUT_CHECK,
  }
}

const initialStore = { isLogin: false };

const changeStatus = (state = initialStore, action) => {
  switch (action.type) {
    case LOGIN_CHECK:
      return { ...state, isLogin: true };
    case LOGOUT_CHECK:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};

export default changeStatus;