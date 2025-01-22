import  { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import apiClient from '../apiclient';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode(token)!;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const Login = () => {
  const navigate=useNavigate();

  useEffect(() => {
    if (isTokenValid()) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const[error,setError]=useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await apiClient.post('/signin', formData); // Send login request
      const { token ,userDataToSend } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userInfo',JSON.stringify(userDataToSend));
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err:any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  

  return (
    <div className="page-container pt-24 flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="category-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Welcome Back</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-purple-400" />
                <input
                  type="email"
                  required
                  className="input-glass w-full pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-purple-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="input-glass w-full pl-10 pr-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-purple-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              
              <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
            <div className="error">
              <p className='text-red-300'>{error}</p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;