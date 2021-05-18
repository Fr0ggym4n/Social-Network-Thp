import {
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    EDIT_USER,
    USER_LOG_OUT,
  } from './userActions';
  
  const currentUserInitialState = {
    loading: false,
    info: {
      id: null,
      username: '',
    },
    error: '',
  };
  
  const currentUserReducer = (state = currentUserInitialState, action) => {
    const { info: stateInfo } = state;
    const { type, user: actionUser, error } = action;
  
    switch (type) {
      case FETCH_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: '',
        };
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          info: {
            ...stateInfo,
            ...actionUser,
          },
        };
      case FETCH_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error,
        };
      case EDIT_USER:
        return {
          ...state,
          loading: false,
          info: {
            ...stateInfo,
            ...actionUser,
          },
        };
      case USER_LOG_OUT:
        return currentUserInitialState;
      default:
        return state;
    }
  };
  
  export default currentUserReducer;