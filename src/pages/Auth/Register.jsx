import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import GoogleSignInButton from '../../components/common/GoogleSignInButton/GoogleSignInButton';
import signupImage from '../../assets/googleimage.jpg';

import '../../styles/auth.css';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await registerUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = ({ user, token }) => {
    login(user, token);
    toast.success('Signed in with Google');
    navigate('/notes');
  };

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="auth-left">
          <div className="google-logo">
            <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
          </div>

          <h1 className="auth-title">Create your Fundoo Account</h1>

          {error && <div className="global-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="firstName" className={`form-input ${fieldErrors.firstName ? 'error' : ''}`}
                  placeholder=" " value={form.firstName} onChange={handleChange} required />
                <label className="form-label">First Name*</label>
                {fieldErrors.firstName && <p className="error-text">{fieldErrors.firstName}</p>}
              </div>

              <div className="form-group">
                <input type="text" name="lastName" className={`form-input ${fieldErrors.lastName ? 'error' : ''}`}
                  placeholder=" " value={form.lastName} onChange={handleChange} required />
                <label className="form-label">Last Name*</label>
                {fieldErrors.lastName && <p className="error-text">{fieldErrors.lastName}</p>}
              </div>
            </div>

            <div className="form-group">
              <input type="email" name="email" className={`form-input ${fieldErrors.email ? 'error' : ''}`}
                placeholder=" " value={form.email} onChange={handleChange} required />
              <label className="form-label">Email*</label>
              <p className="helper-text">You can use letters, numbers & periods</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input type={showPassword ? 'text' : 'password'} name="password"
                  className={`form-input ${fieldErrors.password ? 'error' : ''}`}
                  placeholder=" " value={form.password} onChange={handleChange} required />
                <label className="form-label">Password*</label>
                {fieldErrors.password && <p className="error-text">{fieldErrors.password}</p>}
              </div>

              <div className="form-group">
                <input type={showPassword ? 'text' : 'password'} name="confirmPassword"
                  className={`form-input ${fieldErrors.confirmPassword ? 'error' : ''}`}
                  placeholder=" " value={form.confirmPassword} onChange={handleChange} required />
                <label className="form-label">Confirm*</label>
                {fieldErrors.confirmPassword && <p className="error-text">{fieldErrors.confirmPassword}</p>}
              </div>
            </div>

            <p className="helper-text">Use 8 or more characters with a mix of letters, numbers & symbols</p>

            <label className="show-password">
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
              Show Password
            </label>

            <div className="auth-actions">
              <Link to="/login" className="btn-text">Sign in instead</Link>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Next'}
              </button>
            </div>
          </form>

          <GoogleSignInButton text="signup_with" onSuccess={handleGoogleSuccess} onError={setError} />
        </div>

        <div className="auth-right">
          <img
            src={signupImage}
            alt="One Fundoo account"
            className="auth-illustration"
          />
          <p className="illustration-text">One account. All of Fundoo working for you.</p>
        </div>
      </div>
    </div>
  );
}