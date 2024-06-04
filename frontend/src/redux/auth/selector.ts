
//import { useJwt } from 'react-jwt';
import { RootState } from '../store';
import {jwtDecode} from 'jwt-decode';
//import jwt from 'jsonwebtoken';
export const selectIsAuthenticated = (state: RootState) => {

    
  const token = state.auth.token;
  

  if (!token) return false;
 
  
  
  try {
   // jwt.verify(token, 'abc123456789qwertyui');
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken.exp *1000);
    
    return decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};
