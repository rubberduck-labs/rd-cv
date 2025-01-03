import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import NewResume from '../pages/NewResume';
import ResumeRoute from '../components/ResumeRoute';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute requireAuth={false}><LandingPage /></ProtectedRoute>
  },
  {
    path: '/new',
    element: <ProtectedRoute requireAuth={true}><NewResume /></ProtectedRoute>
  },
  {
    path: '/:path',
    element: <ProtectedRoute requireAuth={false}><ResumeRoute /></ProtectedRoute>
  }
];