import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Signup = () => {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    dob: null as Date | null,
    gender: ''
  });

  const isFormValid = () => {
    const { email, password, username, dob, gender} = formData;
    return (
      email &&
      password &&
      username &&
      dob &&
      gender
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Backend API endpoint for signup
    const API_URL = 'https://localhost:3000/signup';
  
    try {
      // Make a POST request to the API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });
  
  
      if (response.ok) {
        const result = await response.json();
        alert('Signup successful!'); // Success message
        
  
        navigate('/login');
      } else {
        // Handle errors from the API
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
     
      alert('An error occurred. Please try again later.');
    }
  };
  

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return '';
    if (password.length < 8) return 'Weak';
    if (password.length < 12) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Weak': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Strong': return 'bg-green-500';
      default: return '';
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
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  required
                  className="input-glass w-full pl-10"
                  placeholder="Enter your full name"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="input-glass w-full pl-10 pr-10"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className={`h-1 rounded-full ${getStrengthColor(getPasswordStrength(formData.password))}`} />
                  <p className="text-xs text-white/60 mt-1">Password Strength: {getPasswordStrength(formData.password)}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="tel"
                  
                  className="input-glass w-full pl-10"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-white/50" />
                  <DatePicker
                    selected={formData.dob}
                    onChange={(date) => setFormData({ ...formData, dob: date })}
                    maxDate={new Date()}
                    placeholderText="Select your DOB"
                    className="input-glass w-full pl-10"

                    calendarClassName="dark-datepicker"
                    dayClassName={(date) =>
                      date > new Date() ? 'disabled-day' : ''
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Gender</label>
                <select
                  className="input-glass w-full"
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                required
                className="mt-1 form-checkbox rounded bg-neutral-800 border-white/10 text-purple-400 focus:ring-purple-400"
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              />
              <span className="text-sm text-white/80">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms & Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </span>
            </label> */}

            <button type="submit" className="btn-primary w-full disabled:bg-purple-200" disabled={!isFormValid()} >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 ">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;