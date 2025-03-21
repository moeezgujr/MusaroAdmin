"use client";

import { useState, useRef, useEffect } from "react";

export default function ProfileHeader({
  initialCoverImage = null,
  initialProfileImage = null,
  username = "User Name",
  maxFileSize = 5, // in MB
  onCoverImageChange = () => {},
  onProfileImageChange = () => {},
  form,
}) {
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [isHoveringCover, setIsHoveringCover] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  useEffect(() => {
    setCoverImage(initialCoverImage);
    setProfileImage(initialProfileImage)
  }, [initialCoverImage,initialProfileImage ]);
  // Upload states
  const [coverUploadState, setCoverUploadState] = useState({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  });

  const [profileUploadState, setProfileUploadState] = useState({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  });

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  // Reset success message after 3 seconds
  useEffect(() => {
    if (coverUploadState.success) {
      const timer = setTimeout(() => {
        setCoverUploadState((prev) => ({ ...prev, success: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [coverUploadState.success]);

  useEffect(() => {
    if (profileUploadState.success) {
      const timer = setTimeout(() => {
        setProfileUploadState((prev) => ({ ...prev, success: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [profileUploadState.success]);

  // Validate file before upload
  const validateFile = (file) => {
    // Check file size (convert maxFileSize from MB to bytes)
    if (file.size > maxFileSize * 1024 * 1024) {
      return {
        valid: false,
        error: `File size exceeds ${maxFileSize}MB limit`,
      };
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      return {
        valid: false,
        error: "Only image files are allowed",
      };
    }

    return { valid: true, error: null };
  };

  // Simulate file upload with progress
  const simulateUpload = (file, setUploadState, onSuccess) => {
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      success: false,
    });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);

        // Simulate network delay for completion
        setTimeout(() => {
          setUploadState({
            isUploading: false,
            progress: 100,
            error: null,
            success: true,
          });
          onSuccess();
        }, 500);
      } else {
        setUploadState((prev) => ({
          ...prev,
          progress: Math.floor(progress),
        }));
      }
    }, 300);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setCoverUploadState({
        isUploading: false,
        progress: 0,
        error: validation.error,
        success: false,
      });
      return;
    }

    // Preview image immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;

      // Simulate upload
      simulateUpload(file, setCoverUploadState, () => {
        setCoverImage(imageUrl);
        onCoverImageChange(file, imageUrl);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setProfileUploadState({
        isUploading: false,
        progress: 0,
        error: validation.error,
        success: false,
      });
      return;
    }

    // Preview image immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;

      // Simulate upload
      simulateUpload(file, setProfileUploadState, () => {
        setProfileImage(imageUrl);
        onProfileImageChange(file, imageUrl);
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle drag and drop for cover image
  const handleCoverDragOver = (e) => {
    e.preventDefault();
    setIsHoveringCover(true);
  };

  const handleCoverDragLeave = () => {
    setIsHoveringCover(false);
  };

  const handleCoverDrop = (e) => {
    e.preventDefault();
    setIsHoveringCover(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      // Create a synthetic event object with files property
      const syntheticEvent = { target: { files: [file] } };
      handleCoverImageChange(syntheticEvent);
    }
  };

  // Handle drag and drop for profile image
  const handleProfileDragOver = (e) => {
    e.preventDefault();
    setIsHoveringProfile(true);
  };

  const handleProfileDragLeave = () => {
    setIsHoveringProfile(false);
  };

  const handleProfileDrop = (e) => {
    e.preventDefault();
    setIsHoveringProfile(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      // Create a synthetic event object with files property
      const syntheticEvent = { target: { files: [file] } };
      handleProfileImageChange(syntheticEvent);
    }
  };
  console.log(coverImage, initialCoverImage);
  return (
    <div className="profile-header">
      {/* Cover Image Section */}
      <div
        className="cover-image-container"
        onMouseEnter={() => setIsHoveringCover(true)}
        onMouseLeave={() => setIsHoveringCover(false)}
        onDragOver={handleCoverDragOver}
        onDragLeave={handleCoverDragLeave}
        onDrop={handleCoverDrop}
      >
        {coverImage ? (
          <div
            className="cover-image"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
        ) : (
          <div className="cover-image-placeholder">
            <div className="placeholder-icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <span>Add Background Photo</span>
            <span className="drag-hint">Drag and drop or click to upload</span>
          </div>
        )}

        {/* Cover Upload Progress */}
        {coverUploadState.isUploading && (
          <div className="upload-progress-container">
            <div className="upload-progress-bar">
              <div
                className="upload-progress-fill"
                style={{ width: `${coverUploadState.progress}%` }}
              ></div>
            </div>
            <div className="upload-progress-text">
              Uploading... {coverUploadState.progress}%
            </div>
          </div>
        )}

        {/* Cover Upload Error */}
        {coverUploadState.error && (
          <div className="upload-error">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {coverUploadState.error}
          </div>
        )}

        {/* Cover Upload Success */}
        {coverUploadState.success && (
          <div className="upload-success">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Cover photo updated successfully!
          </div>
        )}

        {/* Cover Image Upload Button */}
        <button
          className={`cover-upload-button visible `}
          onClick={() => {
            coverInputRef.current.click();
          }}
          // disabled={coverUploadState.isUploading}
        >
          {/* <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg> */}
          {coverImage ? "Update Background Photo" : "Add Background Photo"}
        </button>
        <input
          type="file"
          ref={coverInputRef}
          onChange={handleCoverImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      {/* Profile Image Section */}
      <div className="profile-section">
        <div
          className="profile-image-container"
          onMouseEnter={() => setIsHoveringProfile(true)}
          onMouseLeave={() => setIsHoveringProfile(false)}
          onDragOver={handleProfileDragOver}
          onDragLeave={handleProfileDragLeave}
          onDrop={handleProfileDrop}
        >
          {profileImage ? (
            <img
              src={profileImage || "/placeholder.svg"}
              alt={username}
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}

          {/* Profile Upload Progress */}
          {profileUploadState.isUploading && (
            <div className="profile-upload-progress">
              <svg viewBox="0 0 36 36" className="circular-progress">
                <path
                  className="circular-progress-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circular-progress-fill"
                  strokeDasharray={`${profileUploadState.progress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="profile-progress-text">
                {profileUploadState.progress}%
              </span>
            </div>
          )}

          {/* Profile Upload Error */}
          {profileUploadState.error && (
            <div className="profile-upload-error">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          )}

          {/* Profile Image Upload Button */}
          <button
            className={`profile-upload-button ${
              isHoveringProfile || profileUploadState.isUploading
                ? "visible"
                : ""
            }`}
            onClick={() => profileInputRef.current.click()}
            disabled={profileUploadState.isUploading}
            title={
              profileImage ? "Update Profile Picture" : "Add Profile Picture"
            }
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </button>
          <input
            type="file"
            ref={profileInputRef}
            onChange={handleProfileImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{username}</h1>

          {/* Profile Upload Success */}
          {profileUploadState.success && (
            <div className="profile-upload-success">
              Profile picture updated successfully!
            </div>
          )}
        </div>
      </div>

      {/* Error tooltip for profile image */}
      {profileUploadState.error && (
        <div className="profile-error-tooltip">{profileUploadState.error}</div>
      )}
    </div>
  );
}
