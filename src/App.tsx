import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Slide, ToastContainer, toast } from 'react-toastify';
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './component/LoginForm';
import SignupForm from './component/SignupForm';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}
/>
      
<BrowserRouter>
<AuthProvider>
        <Routes>
 
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/signup'   element={<SignupForm />} />
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<h1>Not Found</h1>}/>
     
        </Routes>
        </AuthProvider>``
      </BrowserRouter>
     
    </>
  )
}

export default App
