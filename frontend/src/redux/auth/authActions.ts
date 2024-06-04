import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Dispatch } from 'redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERROR
} from './authActionTypes';
import { AuthActionTypes } from './authActionTypes';
import { toast } from 'react-toastify';

export const login = (email: string, password: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    const { access_token } = response.data;
    const decodedToken:any = jwtDecode(access_token);
    console.log(decodedToken);
    toast.success('Login Successful');
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        email: decodedToken.email,
        access_token
      }
    });

    localStorage.setItem('token', access_token);
  } catch (error: any) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Login failed'
    });
  }
};

export const logout = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: LOGOUT_REQUEST });

  try {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error: any) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.message
    });
  }
};

export const register1 = (email: string, password: string,role:string) => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post('http://localhost:3000/auth/register', { email, password,role });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data.token
    });
    localStorage.setItem('token', response.data.access_token);
  } catch (error: any) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || 'Registration failed'
    });
  }
};
export const clearError = () => ({
  type: CLEAR_ERROR
});


