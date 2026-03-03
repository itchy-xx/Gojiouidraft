import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import imgImage8 from "../assets/LoginRegister.png";

export const LoginPage = () => {
    const navigate = useNavigate();
    
    // 1. Pull setUser from your AppContext
    const { login } = useApp(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 2. Define the missing setError state
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Now this is defined!

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user.email, password);
                navigate('/home');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Could not connect to the server');
        }
    };

    return (<div className="bg-white relative min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[388px] space-y-12">
          {/* Intro */}
          <div>
            <h1 className="text-[36px] font-semibold text-[#0c1421] leading-none">
              Welcome Back <span className="font-normal">👋</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[16px] text-[#0c1421] font-normal">Email</label>
              <div className="relative">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Example@email.com" className="w-full h-[48px] bg-[#f7fbff] border border-[#d4d7e3] rounded-[12px] px-4 text-[16px] text-[#0c1421] placeholder:text-[#8897ad] focus:outline-none focus:ring-2 focus:ring-[#5661f6] focus:border-transparent" required/>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[16px] text-[#0c1421] font-normal">Password</label>
              <div className="relative">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="w-full h-[48px] bg-[#f7fbff] border border-[#d4d7e3] rounded-[12px] px-4 text-[16px] text-[#0c1421] placeholder:text-[#8897ad] focus:outline-none focus:ring-2 focus:ring-[#5661f6] focus:border-transparent" required/>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-[16px] text-[#1e4ae9] hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="w-full bg-[#5661f6] hover:bg-[#4551e6] text-white text-[20px] py-4 rounded-[12px] transition-colors">
              Sign in
            </button>
          </form>

          {/* Or Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-[#CFDFE2]"></div>
            <span className="text-[16px] text-[#294957]">Or</span>
            <div className="flex-1 h-[1px] bg-[#CFDFE2]"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-[18px]">
            <span className="text-[#313957]">Don't you have an account? </span>
            <Link to="/register" className="text-[#1e4ae9] hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 p-10">
        <div className="h-full rounded-[47px] overflow-hidden">
          <img src={imgImage8} alt="Community" className="w-full h-full object-cover object-center" style={{ objectPosition: 'center' }}/>
        </div>
      </div>
    </div>);
};
