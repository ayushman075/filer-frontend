import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '@/utils/axiosConfig';
import { toast } from 'react-toastify';
import { replace, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
    
  const signup = async (formData:any) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await axiosInstance.post('auth/register', {
          userData: {
            email: formData.email,
            password: formData.password
          }
        });
      
        if (response.data.success) {
          console.log('Signup successful', response.data.message);
          toast.success("Signup successful, Please login!")
          navigate("/login",{replace:true})
        }
   
    } catch (error:any) {
      console.error('Signup error:', error);
      toast.error(error.response.data.message || "Opps, An Error Occurred!")
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await axiosInstance.post('auth/login', formData);
      
        if (response.data.success) {
          console.log('Login successful', response.data.message);
          toast.success("Login successful!")
          
          setUser(response.data.user)
          Cookies.set("accessToken", response.data.accessToken, { expires: 15 });
          navigate('/',{replace:true})
        }
   
    } catch (error:any) {
      console.error('Login error:', error);
      toast.error(error.response.data.message || "Opps, An Error Occurred!")
      
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await axiosInstance.post('auth/logout');
      
        if (response.data.success) {
          console.log('Logout successful', response.data.message);
          toast.success("Logout successful!")
          navigate('/login',{replace:true})
          setUser(null)
        }
   
    } catch (error:any) {
      console.error('Login error:', error);
      toast.error(error.response.data.message || "Opps, An Error Occurred!")
      
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await axiosInstance.get('auth/getcurrentuser');
      
        if (response.data.success) {
          console.log('User fetched successful', response.data.message);
          navigate('/',{replace:true})
          setUser(response.data.user)
        }
   
    } catch (error:any) {
      console.error('User fetching error:', error);
         
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    if(!isLoading){
    checkAuth()
    }
  },[])

  const value = {
    user,
    isLoading,
    error,
    signup,
    login,
    logout,
    checkAuth,
    isLoggedIn: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};