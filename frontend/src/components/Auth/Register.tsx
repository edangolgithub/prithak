import React, { useState } from 'react';

import { register1 } from '../../redux/auth/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//interface RegisterProps { }

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      let role = 'user'
      if (isAdmin) {
        role = 'admin'
      }
      dispatch(register1(email, password,role));
      toast.success('Registration successful');
      navigate('/login');
      setError('');
    } catch (error: any) {
      toast.error('Registration failed.'+error.response?.data?.message);
      console.error('Registration error:', error.response.data.message);
      setError(error.response?.data?.message || 'Registration error occurred.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              {error && <div className="alert alert-danger">{error}</div>}
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
              <div className="form-group">
                <label>IsAdmin</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </div>
              <button className="btn btn-primary btn-block mt-3" onClick={handleRegister}>Register</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
