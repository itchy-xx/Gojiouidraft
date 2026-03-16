import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#5661f6] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-[#5661f6] hover:bg-[#4551e6]"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};
