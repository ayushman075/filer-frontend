import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';
import axiosInstance from '@/utils/axiosConfig';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {isLoading,user,signup} = useAuth();
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
    const navigate = useNavigate();
   useEffect(()=>{
      if(!isLoading && user){
        navigate('/')
      }
    },[user,isLoading])

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(!formData.email || !formData.password){
        toast.error('Some field are empty!')
      }else{
       await signup(formData);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error encountered while trying to signup!')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <Link to='/login' className='text-blue-600'>Have an Account? Login</Link>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading?"Processing ...":"Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;