// utils/authMiddleware.js
import { getSession } from 'next-auth/react';

// Middleware to protect API routes
export const authMiddleware = async (req, res) => {
  const session = await getSession({ req });
  
  if (!session) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return false;
  }
  
  return session;
};

// Middleware for seller routes
export const sellerMiddleware = async (req, res) => {
  const session = await authMiddleware(req, res);
  
  if (!session) return false;
  
  if (session.user.role !== 'seller' && session.user.role !== 'admin') {
    res.status(403).json({ success: false, message: 'Not authorized as a seller' });
    return false;
  }
  
  return session;
};

// Middleware for admin routes
export const adminMiddleware = async (req, res) => {
  const session = await authMiddleware(req, res);
  
  if (!session) return false;
  
  if (session.user.role !== 'admin') {
    res.status(403).json({ success: false, message: 'Not authorized as an admin' });
    return false;
  }
  
  return session;
};