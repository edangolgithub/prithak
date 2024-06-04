import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearError, login } from '../../redux/auth/authActions';
import { selectIsAuthenticated } from '../../redux/auth/selector';
import { toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState('evan@mail.com');
  const [password, setPassword] = useState('secrET123#@');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(isAuthenticated);

  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/task');
    } else if (isAuthenticated === false) {

    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await dispatch(login(email, password));

    } catch (error) {
      console.log('err');

      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                     dispatch(clearError())
                    }}
                  ></button>
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-block mt-3" onClick={handleLogin}>Login</button>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/regis">Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
