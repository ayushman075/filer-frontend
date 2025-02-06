import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstanceFile } from '@/utils/axiosConfig';


const FileForm = () => {

    const [loading, setLoading] = useState(false);
 

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.name.endsWith('.xml')) {
        toast.error("Invalid file");
      return;
    }

    const formData = new FormData();
    formData.append('dataFile', file);

    setLoading(true);
    try {
      const response = await axiosInstanceFile.post('file/upload/xml', formData
      );
      console.log(response);
      toast.success("Data File uploaded successfully!")
    } catch (error) {
        console.log(error)
        toast.error(error.response.message || "Opps, An error occured while uploading file")
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Card className="w-full max-w-md mx-auto mt-8">
     
      <CardContent>
        <div className="flex flex-col mt-6 items-center gap-4">
          <label 
            htmlFor="file-upload" 
            className="w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-primary"
          >
            <Upload className="h-8 w-8 text-gray-500" />
            <span className="text-sm text-gray-500">Click to upload XML file</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xml"
            className="hidden"
            onChange={handleFileUpload}
            disabled={loading}
          />
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default FileForm
