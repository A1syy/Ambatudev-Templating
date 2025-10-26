import { v4 as uuidv4 } from 'uuid';
import { User } from '../utils/types';
import { saveToStorage, getFromStorage } from '../utils/storage';
import usersData from '../data/users.json';

// In-memory users array that mimics a database
let users: User[] = [...usersData.users];

// Local storage key for user session
const USER_SESSION_KEY = 'user_session';

/**
 * Register a new user
 * @param email User email
 * @param password User password
 * @param name User name
 * @returns The newly created user
 */
export const registerUser = (email: string, password: string, name: string): User => {
  // Check if email is already registered
  if (users.some(user => user.email === email)) {
    throw new Error('Email already registered');
  }

  // Create new user
  const newUser: User = {
    id: uuidv4(),
    email,
    password, // Note: In a real app, passwords should be hashed
    name
  };

  // Add to users array
  users = [...users, newUser];
  
  // Save to local JSON (simulated)
  console.log('User registered:', newUser);
  
  return newUser;
};

/**
 * Login a user
 * @param email User email
 * @param password User password
 * @returns The user if login successful
 */
export const loginUser = (email: string, password: string): User => {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Save user session to local storage (excluding password)
  const session = { ...user, password: '' }; // Remove password from session
  saveToStorage(USER_SESSION_KEY, session);
  
  return user;
};

/**
 * Update user profile
 * @param user Updated user data
 * @returns The updated user
 */
export const updateUserProfile = (user: User): User => {
  const index = users.findIndex(u => u.id === user.id);
  if (index === -1) {
    throw new Error('User not found');
  }
  
  // Update user in array
  users[index] = { ...users[index], ...user };
  
  // Update session
  const session = { ...users[index], password: '' };
  saveToStorage(USER_SESSION_KEY, session);
  
  return users[index];
};

/**
 * Update user password
 * @param userId User ID
 * @param currentPassword Current password
 * @param newPassword New password
 */
export const updateUserPassword = (userId: string, currentPassword: string, newPassword: string): void => {
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    throw new Error('User not found');
  }
  
  if (users[index].password !== currentPassword) {
    throw new Error('Current password is incorrect');
  }
  
  users[index].password = newPassword;
};

/**
 * Logout the current user
 */
export const logoutUser = (): void => {
  localStorage.removeItem(USER_SESSION_KEY);
};

/**
 * Get the current user from session
 * @returns The current user or null if not logged in
 */
export const getCurrentUser = (): User | null => {
  return getFromStorage<User | null>(USER_SESSION_KEY, null);
};

/**
 * Check if a user is logged in
 * @returns True if a user is logged in
 */
export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};