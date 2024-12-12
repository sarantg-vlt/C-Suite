import React, { useState, useEffect } from "react";
import "./Profile.css";
import profileImage from "../Assets/Images/profileImage.jpeg";
import profileBanner from "../Assets/Images/profileBanner.jpg";
import phoneSVG from "../Assets/SVG/phoneSVG.svg";
import mailSVG from "../Assets/SVG/mailSVG.svg";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import defaultPorfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";
import defaultBannerSVG from "../Assets/SVG/defaultBannerSVG.svg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    elaTestScore: "",
    // idCard: "",
    gender: "",
    profilePic: profileImage,
    profileBanner: profileBanner,
    address: "",
    companyname: "",
    position: "",
    linkedIn: "",
    bio: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      address: "",
    },
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileBanner, setSelectedProfileBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchProfileData = async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const id = localStorage.getItem("userid");

      if (!id) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await axios.get(`${apiBaseUrl}/user/user/${id}`);
      const data = response.data.user;

      if (!data) {
        throw new Error("No user data received from server");
      }

      // Update localStorage with fresh data from server
      localStorage.setItem("userDataUpdated", JSON.stringify(data));

      // Update user info for course access
      const csuiteUserInfo = {
        userID: data._id,
        coursePurchased: data.coursePurchased?.length ?
          data.coursePurchased.map((x) => x.courseId) : [],
      };
      localStorage.setItem("userInfo", JSON.stringify(csuiteUserInfo));

      // Handle profile pictures with proper base64 checking and default fallback
      const processedData = {
        ...data,
        profilePic: data.profilePic ?
          (data.profilePic.startsWith("data:image/") ?
            data.profilePic : `data:image/jpeg;base64,${data.profilePic}`) :
          defaultPorfileSVG,
        profileBanner: data.profileBanner ?
          (data.profileBanner.startsWith("data:image/") ?
            data.profileBanner : `data:image/jpeg;base64,${data.profileBanner}`) :
          defaultBannerSVG,
      };

      setProfileData(processedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setFetchError(true);
      setIsLoading(false);
    }
  };

    const validateForm = () => {
      const { name, phoneNumber, email } = profileData;

      // Validate Name (only alphabets)
      const namePattern = /^[A-Za-z\s]+$/;
      if (!name || !namePattern.test(name)) {
        alert("Name must only contain alphabets.");
        return false;
      }

      // Validate Phone Number (exactly 10 digits)
      const phonePattern = /^[0-9]{10}$/;
      if (!phoneNumber || !phonePattern.test(phoneNumber)) {
        alert("Phone number must be exactly 10 digits.");
        return false;
      }

      // Validate Email (basic email format)
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
      }

      return true;
  };
  
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setProfileData((prevData) => ({
        ...prevData,
        emergencyContact: {
          ...prevData.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const formData = new FormData();

      // Handle basic fields
      const basicFields = [
        'name', 'gender', 'idCard', 'address', 'phoneNumber',
        'companyname', 'position', 'linkedIn', 'bio'
      ];

      basicFields.forEach(field => {
        if (profileData[field] !== undefined && profileData[field] !== null) {
          formData.append(field, profileData[field]);
        }
      });

      // Handle emergency contact separately
      if (profileData.emergencyContact) {
        Object.entries(profileData.emergencyContact).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(`emergencyContact.${key}`, value);
          }
        });
      }

      // Handle images only if they've been changed
      if (selectedProfileImage) {
        formData.append('profilePic', selectedProfileImage);
      } else if (profileData.profilePic && !profileData.profilePic.includes('defaultPorfileSVG')) {
        // If there's an existing image and it's not the default
        formData.append('profilePic', profileData.profilePic);
      }

      if (selectedProfileBanner) {
        formData.append('profileBanner', selectedProfileBanner);
      } else if (profileData.profileBanner && !profileData.profileBanner.includes('defaultBannerSVG')) {
        // If there's an existing banner and it's not the default
        formData.append('profileBanner', profileData.profileBanner);
      }

      // Log the FormData contents for debugging
      console.log('Form Data Contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (!profileData._id) {
        throw new Error("User ID not found in profile data");
      }

      const response = await axios.put(
        `${apiBaseUrl}/user/${profileData._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000,
          validateStatus: function (status) {
            return status >= 200 && status < 300;
          }
        }
      );

      if (response.data.user) {
        localStorage.setItem("userDataUpdated", JSON.stringify(response.data.user));
        await fetchProfileData();
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error saving profile:", error);

      if (error.response) {
        console.error("Server Error Data:", error.response.data);
        console.error("Server Error Status:", error.response.status);
        setSaveError(`Server error: ${error.response.data.message || 'Failed to save profile changes'}`);
      } else if (error.request) {
        setSaveError("No response from server. Please check your internet connection.");
      } else {
        setSaveError("Failed to save profile changes. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveError("Profile image must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSaveError("Please select a valid image file");
        return;
      }

      setSelectedProfileImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profilePic: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileBannerChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveError("Banner image must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSaveError("Please select a valid image file");
        return;
      }

      setSelectedProfileBanner(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profileBanner: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClassName = (value) => {
    return value === "" || value === null || value === undefined ? "error-border" : "";
  };

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  const handleBackClick = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="profile-back-arrow-container" onClick={handleBackClick}>
        <IoMdArrowRoundBack className="profile-back-arrow" />
      </div>
      <div className="profileContainer">
        {saveError && <div className="error-message">{saveError}</div>}
        {saveSuccess && (
          <div className="success-message">Profile updated successfully!</div>
        )}
        <div className="profileBannerBox">
          <div className="profileBGBox">
            <img
              src={profileData?.profileBanner || defaultBannerSVG}
              alt="Banner"
              onError={(e) => {
                e.target.src = defaultBannerSVG;
              }}
            />
            {isEditing && (
              <label className="custom-file-upload imageBanner">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileBannerChange}
                  className="imageBannerUpload"
                />
                Choose File for Profile Banner
              </label>
            )}
          </div>
          <div className="profileHeader">
            <div className="profileImage">
              <img
                src={profileData?.profilePic || defaultPorfileSVG}
                alt="Profile"
                className="defaultImage"
                onError={(e) => {
                  e.target.src = defaultPorfileSVG;
                }}
              />
              {isEditing && (
                <label className="custom-file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="imageUpload"
                  />
                  Choose File
                </label>
              )}
            </div>
            <div className="profileHeaderInfo">
              <h2 className="profileName">{profileData?.name}</h2>
              <p className="profileEmail">{profileData?.email}</p>
            </div>
            <div className="profileEditBtn">
              <button onClick={isEditing ? handleSaveClick : handleEditClick}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
        <div className="profileContent">
          <div className="profileSection">
            <h5>General Information</h5>
            <div
              className={`${inputClassName(profileData?.name)} profileDetails`}
            >
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(profileData.gender)} profileDetails`}
            >
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                value={profileData?.gender || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            {/* <div
              className={`${inputClassName(profileData.idCard)} profileDetails`}
            >
              <label>ID Card</label>
              <input
                type="text"
                name="idCard"
                value={profileData?.idCard || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div> */}
            <div
              className={`${inputClassName(
                profileData.address
              )} profileDetails`}
            >
              <label>Address</label>
              <textarea
                name="address"
                value={profileData?.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData?.elaTestScore
              )} profileDetails`}
            >
              <label>Test Score</label>
              <input
                type="number"
                name="testScore"
                value={profileData?.elaTestScore || ""}
                onChange={handleChange} // Allow changes when editing
                disabled={!isEditing} // Disable input when not editing
              />
            </div>
            <div className="profileSeperator"></div>
            <h5>Contact Details</h5>
            <div
              className={`${inputClassName(
                profileData.email
              )} profileDetails profileSPLBox`}
            >
              <img src={mailSVG} alt="mailSVG" />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileData?.email || ""}
                readOnly
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.phoneNumber
              )} profileDetails profileSPLBox`}
            >
              <img src={phoneSVG} alt="phoneNumberSVG" />
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={profileData?.phoneNumber || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="profileSection">
            <h5>Professional Details</h5>
            <div
              className={`${inputClassName(
                profileData.companyname
              )} profileDetails`}
            >
              <label>Company Name</label>
              <input
                type="text"
                name="companyname"
                value={profileData?.companyname || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.position
              )} profileDetails`}
            >
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={profileData?.position || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.linkedIn
              )} profileDetails`}
            >
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedIn"
                value={profileData?.linkedIn || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(profileData.bio)} profileDetails`}
            >
              <label>Bio</label>
              <textarea
                name="bio"
                value={profileData?.bio || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="profileSeperator"></div>
            <h5>Emergency Contact</h5>
            <div
              className={`${inputClassName(
                profileData.emergencyContact?.name
              )} profileDetails`}
            >
              <label>Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContact.name"
                value={profileData.emergencyContact?.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.emergencyContact?.relationship
              )} profileDetails`}
            >
              <label>Relationship</label>
              <input
                type="text"
                name="emergencyContact.relationship"
                value={profileData.emergencyContact?.relationship || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.emergencyContact?.phone
              )} profileDetails`}
            >
              <label>Emergency Contact Phone</label>
              <input
                type="text"
                name="emergencyContact.phone"
                value={profileData.emergencyContact?.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.emergencyContact?.address
              )} profileDetails`}
            >
              <label>Emergency Contact Address</label>
              <textarea
                name="emergencyContact.address"
                value={profileData.emergencyContact?.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
  };

  export default Profile;
