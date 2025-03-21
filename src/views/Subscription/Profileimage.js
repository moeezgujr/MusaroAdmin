"use client"

import { useState } from "react"
import ProfileHeader from "./Profileheader"
import "./Profile.css"

export default function Profile({cb, form}) {
  const [uploadedFiles, setUploadedFiles] = useState({
    coverImage: null,
    profileImage: null,
  })

  const handleCoverImageChange = (file, imageUrl) => {
    console.log("Cover image uploaded:", file.name)
    if(cb){
      cb('backgroundImage', file)
    }
    // In a real application, you would upload the file to your server here
    // For example using FormData and fetch:
    /*
    const formData = new FormData();
    formData.append('coverImage', file);
    
    fetch('/api/upload-cover', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    */

    // For demo purposes, just store the file info
    setUploadedFiles((prev) => ({
      ...prev,
      coverImage: {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      },
    }))
  }

  const handleProfileImageChange = (file, imageUrl) => {
    console.log("Profile image uploaded:", file.name)
    if(cb){
      cb('profileImage', file)
    }
    // In a real application, you would upload the file to your server here

    // For demo purposes, just store the file info
    setUploadedFiles((prev) => ({
      ...prev,
      profileImage: {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      },
    }))
  }
  return (
    // <main className="container">

      <ProfileHeader
        username={form?.name}
        onCoverImageChange={handleCoverImageChange}
        onProfileImageChange={handleProfileImageChange}
        maxFileSize={5} // 5MB max file size
        initialCoverImage={form?.backgroundPicture}
        initialProfileImage={form?.profilePicture}
        form={form}
      />

 

     
  )
}

