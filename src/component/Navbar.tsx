import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';
import { Upload, LogOut } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import FileForm from './FileForm';
  

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl text-primary font-bold">Filer</h1>
          </div>
          
          <div className="flex items-center gap-4">
          <Dialog >
  <DialogTrigger>  
    <Button variant="default" className="flex items-center gap-2">
              <Upload size={18} />
             <span className='max-sm:hidden'> Import Data</span>
            </Button>
            </DialogTrigger>
  <DialogContent className="bg-white border-0">
    <DialogHeader>
      <DialogTitle>Import XML File</DialogTitle>
      <DialogDescription >
       <FileForm/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
            
            <Button 
              variant="outline" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              <span className='max-sm:hidden'>  Logout </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;