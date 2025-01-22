import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import apiClient from '../apiclient';
import Swal from 'sweetalert2';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    dob: null,
    gender: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: '',
    dob: '',
    gender: '',
  });

  const validateFields = () => {
    const newErrors = {
      email: formData.email ? '' : 'Email is required.',
      password: formData.password ? '' : 'Password is required.',
      username: formData.username ? '' : 'Full Name is required.',
      dob: formData.dob ? '' : 'Date of Birth is required.',
      gender: formData.gender ? '' : 'Gender is required.',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await apiClient.post('/signup', formData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Signup Successful',
          text: 'Your Account has been created. Please login',
          icon: 'success',
          confirmButtonColor: '#A855F7',
          background: '#1F2937',
          color: '#FFFFFF',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while creating account. Please try again.',
        icon: 'error',
        confirmButtonColor: '#A855F7',
        background: '#1F2937',
        color: '#FFFFFF',
      });
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
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-purple-400" />
                <input
                  type="text"
                  className="input-glass w-full pl-10"
                  placeholder="Enter your full name"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-purple-400" />
                <input
                  type="email"
                  className="input-glass w-full pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-purple-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-glass w-full pl-10 pr-10"
                  placeholder="Create a password"
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-purple-400" />
                <input
                  type="tel"
                  className="input-glass w-full pl-10"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className='grid grid-cols-2 gap-4'>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 text-purple-400" />
                  <DatePicker
                    selected={formData.dob}
                    onChange={(date) => setFormData({ ...formData, dob: date })}
                    maxDate={new Date()}
                    placeholderText="Select your DOB"
                    className="input-glass w-full pl-10 z-20"
                  />
                </div>
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Gender</label>
                <select
                  className="input-glass w-full"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>

            </div>



            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300">
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
