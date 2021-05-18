const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
const EDIT_USER = 'EDIT_USER';
const USER_LOG_OUT = 'USER_LOG_OUT';

export {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  EDIT_USER,
  USER_LOG_OUT,
};

const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  user,
});

const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  error,
});

const editUser = (user) => ({
  type: EDIT_USER,
  user,
});

const userLogOut = () => ({
  type: USER_LOG_OUT,
});

export {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  editUser,
  userLogOut,
};