import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User } from '../utils/types';
import { updateUserProfile, updateUserPassword } from '../services/authService';

const ProfilePage: React.FC = () => {
  const { authState, updateAuth } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(authState.user?.profileImage || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200');
  
  const [formData, setFormData] = useState({
    name: authState.user?.name || '',
    email: authState.user?.email || '',
    phone: authState.user?.phone || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const updatedUser = await updateUserProfile({
        ...authState.user!,
        ...formData,
        profileImage
      });
      
      updateAuth(updatedUser);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };
  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      await updateUserPassword(
        authState.user!.id,
        passwordData.currentPassword,
        passwordData.newPassword
      );
      
      setSuccess('Password updated successfully!');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('Failed to update password');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-md">
            {success}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Profile Header */}
          <div className="flex items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={profileImage}
                  alt={authState.user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">{authState.user?.name}</h2>
              <p className="text-gray-600">{authState.user?.email}</p>
            </div>
          </div>
          
          {/* Profile Form */}
          {isEditing ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button type="submit">Save Changes</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <p className="mt-1">{authState.user?.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                  <p className="mt-1">{authState.user?.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                  <p className="mt-1">{authState.user?.phone || 'Not set'}</p>
                </div>
              </div>
              
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </div>
        
        {/* Change Password Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Change Password</h3>
          
          {isChangingPassword ? (
            <form onSubmit={handlePasswordUpdate}>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                
                <Input
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button type="submit">Update Password</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button onClick={() => setIsChangingPassword(true)}>
              Change Password
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;