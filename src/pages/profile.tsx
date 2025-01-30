import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, Eye, EyeOff } from 'lucide-react';
import apiClient from '../apiclient';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: null as Date | null,
    gender: '',
    profileimageurl: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const formatDateForInput = (utcDate) => {
    const date = new Date(utcDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get(`/profile`); // Replace with your API endpoint
        setFormData({ ...response.data, dob: formatDateForInput(response.data.dob) });
        setProfileImage(response.data.profileimageurl);

      } catch (error) {
        console.error('Error fetching cloth details:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const resp = await apiClient.put('profile', { ...formData, profileimageurl: profileImage });
      console.log('resp', resp);
      console.log('status', resp.status);
      if (resp.status === 200 && resp.data) {
        setFormData({ ...resp.data.user, dob: formatDateForInput(resp.data.user.dob) });
        setProfileImage(resp.data.user.profileimageurl);
        Swal.fire({
          title: 'Saved!',
          text: 'Your profile has been saved.',
          icon: 'success',
          confirmButtonColor: '#A855F7', // Same primary color
          background: '#1F2937',
          color: '#FFFFFF',
        });
      }
      else {
        throw new Error('Unexpected response structure or status');
      }
    }
    catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while saving the profile.',
        icon: 'error',
        confirmButtonColor: '#A855F7', // Same primary color
        background: '#1F2937',
        color: '#FFFFFF',
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Your Profile
      </motion.h1>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture - Left Side */}
            <div className="md:w-1/3">
              <div className="relative">
                {profileImage ? (
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full aspect-square rounded-lg object-cover border-2 border-purple-400"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-square rounded-lg bg-neutral-800 flex items-center justify-center cursor-pointer hover:bg-neutral-700 transition-colors group"
                  >
                    <Camera className="w-12 h-12 z-10 text-purple-400 group-hover:text-white/80 transition-colors" />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Profile Information - Right Side */}
            <div className="md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="input-glass w-full"
                    placeholder='Enter Your Full Name'
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-glass w-full"
                    placeholder='Enter Your Email Address'
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-glass w-full"
                    placeholder='Enter Your Number'
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Date of Birth</label>
                  <DatePicker
                    selected={formData.dob}
                    onChange={(date) => setFormData({ ...formData, dob: date })}
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    placeholderText="Select your DOB"
                    className="input-glass w-full pl-10"

                    calendarClassName="dark-datepicker"
                    dayClassName={(date) =>
                      date > new Date() ? 'disabled-day' : ''
                      
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="input-glass w-full"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Password Change Section */}
              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Change Password
                </button>

                {showPasswordChange && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="input-glass w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="input-glass w-full pr-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="input-glass w-full pr-10"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
                <button className="btn-primary" onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
