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
import { isValidLinkedin } from "../../../Auth/utils/validityCheck";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression";

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
    profilePic: "",
    profileBanner: "",
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
        coursePurchased: data.coursePurchased?.length
          ? data.coursePurchased.map((x) => x.courseId)
          : [],
      };
      localStorage.setItem("userInfo", JSON.stringify(csuiteUserInfo));

      // Handle profile pictures with proper base64 checking and default fallback
      const processedData = {
        ...data,
        profilePic: data.profilePic
          ? data.profilePic.startsWith("data:image/")
            ? data.profilePic
            : `data:image/jpeg;base64,${data.profilePic}`
          : defaultPorfileSVG,
        profileBanner: data.profileBanner
          ? data.profileBanner.startsWith("data:image/")
            ? data.profileBanner
            : `data:image/jpeg;base64,${data.profileBanner}`
          : defaultBannerSVG,
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
    const requiredFields = [
      { field: "name", message: "Please fill Name field." },
      { field: "gender", message: "Please fill Gender field." },
      { field: "address", message: "Please fill Address field." },
      { field: "email", message: "Please fill Email field." },
      { field: "phoneNumber", message: "Please fill Phone Number field." },
      { field: "companyname", message: "Please fill Company Name field." },
      { field: "position", message: "Please fill Position field." },
      { field: "linkedIn", message: "Please fill LinkedIn URL field." },
      { field: "bio", message: "Please fill Bio field." },
      {
        field: "emergencyContact.name",
        message: "Please fill Emergency Contact Name field.",
      },
      {
        field: "emergencyContact.relationship",
        message: "Please fill Emergency Contact Relationship field.",
      },
      {
        field: "emergencyContact.phone",
        message: "Please fill Emergency Contact Phone field.",
      },
      {
        field: "emergencyContact.address",
        message: "Please fill Emergency Contact Address field.",
      },
    ];

    // Validate required fields
    for (const item of requiredFields) {
      const fieldParts = item.field.split(".");
      let value = profileData;
      for (const part of fieldParts) {
        value = value?.[part];
      }

      if (!value) {
        toast.error(item.message);
        return;
      }
    }

    // Field validation
    if (!/^[A-Za-z\s]+$/.test(profileData.name)) {
      toast.error("Invalid Name: Only alphabets and spaces allowed.");
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(profileData.gender)) {
      toast.error("Invalid Gender: Only alphabets and spaces allowed.");
      return;
    }
    if (profileData.elaTestScore && isNaN(profileData.elaTestScore)) {
      toast.error("Test Score must be a number.");
      return;
    }
    if (!/^[6-9][0-9]{9}$/.test(profileData.phoneNumber)) {
      toast.error("Invalid Phone Number. It start from 6 to 9 and be 10 digits long.");
      return;
    }
    if (profileData.linkedIn && !isValidLinkedin(profileData.linkedIn)) {
      toast.error("Invalid LinkedIn URL.");
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(profileData.emergencyContact.name)) {
      toast.error("Invalid Emergency Contact Name.");
      return;
    }
    if (!/^[6-9][0-9]{9}$/.test(profileData.emergencyContact.phone)) {
      toast.error(
        "Invalid Emergency Contact Phone.It start from 6 to 9 and be 10 digits long"
      );
      return;
    }

    // Prepare for submission
    setIsLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      if (!profileData._id) throw new Error("User ID not found.");

      const formData = new FormData();

      // Basic fields
      [
        "name",
        "gender",
        "idCard",
        "address",
        "phoneNumber",
        "companyname",
        "position",
        "linkedIn",
        "bio",
      ].forEach((field) => {
        if (profileData[field]) {
          formData.append(field, profileData[field]);
        }
      });

      // Emergency contact
      Object.entries(profileData.emergencyContact || {}).forEach(
        ([key, value]) => {
          if (value) {
            formData.append(`emergencyContact.${key}`, value);
          }
        }
      );

      // Images
      if (selectedProfileImage) {
        formData.append("profilePic", selectedProfileImage);
      }

      if (selectedProfileBanner) {
        formData.append("profileBanner", selectedProfileBanner);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/${profileData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60000,
          validateStatus: (status) => status >= 200 && status < 300,
        }
      );

      if (response.data.user) {
        localStorage.setItem(
          "userDataUpdated",
          JSON.stringify(response.data.user)
        );
        await fetchProfileData();
        setIsEditing(false);
        setSaveSuccess(true);
        toast.success("Profile updated successfully!");
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Image compression function
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Image compression error:", error);
      return file;
    }
  };

  // Handle profile image change
  const handleProfileImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSaveError("Profile image must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSaveError("Please select a valid image file");
      return;
    }

    const compressed = await compressImage(file);
    setSelectedProfileImage(compressed);

    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileData((prev) => ({
        ...prev,
        profilePic: e.target.result,
      }));
    };
    reader.readAsDataURL(compressed);
  };

  const handleProfileBannerChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSaveError("Banner image must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSaveError("Please select a valid image file");
      return;
    }

    const compressed = await compressImage(file);
    setSelectedProfileBanner(compressed);

    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileData((prev) => ({
        ...prev,
        profileBanner: e.target.result,
      }));
    };
    reader.readAsDataURL(compressed);
  };

  const inputClassName = (value) => {
    return value === "" || value === null || value === undefined
      ? "error-border"
      : "";
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

  // new

  return (
    <>
      <ToastContainer />
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
                pattern="[A-Za-z\s]+"
                value={profileData.name || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Remove numbers and special characters
                  handleChange({ target: { name: "name", value } });
                }}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(profileData.gender)} profileDetails`}
            >
              <label>Gender</label>
              <select
                name="gender"
                value={profileData?.gender || ""} // Default to "" if undefined
                onChange={handleChange}
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>{" "}
                {/* Ensure the default option is selected */}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="prefernottosay">Prefer Not To Say</option>
              </select>
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
                readOnly
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
              {/*               
            <input
              type="Number"
              required
              name="phoneNumber"
              maxLength={10}
              value={profileData.phoneNumber || ""}
              onChange={handleChange}
              disabled={!isEditing}
            /> */}
              <input
                type="tel"
                required
                name="phoneNumber"
                maxLength={10}
                value={profileData.phoneNumber || ""}
                onChange={handleChange}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                } // Remove non-numeric input
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
                required
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
                required
                pattern="[A-Za-z0-9\s]+" // Allows alphabets, numbers, and spaces
                title="Accept only text and number format"
                value={profileData?.position || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z0-9\s]/g, ""); // Allows alphabets, numbers, and spaces, removes others
                  handleChange({ target: { name: "position", value } });
                }}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.linkedIn
              )} profileDetails`}
            >
              <label>LinkedIn</label>
              {/* <input
              type="url"
              name="linkedIn"
              required
              pattern="url"
              value={profileData?.linkedIn || ""}
              onChange={handleChange}
              disabled={!isEditing}
            /> */}
              {/* import {isValidLinkedin} from "../../../Auth/utils/validityCheck"; */}

              <input
                type="url"
                name="linkedIn"
                required
                value={profileData?.linkedIn || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(e); // Update state
                }}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(profileData.bio)} profileDetails`}
            >
              <label>Bio</label>
              <textarea
                name="bio"
                required
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
                required
                pattern="[A-Za-z\s]+" // Ensures validation on form submission
                value={profileData.emergencyContact?.name || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z\s]/g, ""); // Removes numbers and special characters
                  handleChange({
                    target: { name: "emergencyContact.name", value },
                  });
                }}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${inputClassName(
                profileData.emergencyContact?.relationship
              )} profileDetails`}
            >
              <label>Relationship</label>
              <select
                name="emergencyContact.relationship"
                value={profileData.emergencyContact?.relationship || ""}
                onChange={handleChange}
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Relationship
                </option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Spouse">Spouse</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div
              className={`${inputClassName(
                profileData.emergencyContact?.phone
              )} profileDetails`}
            >
              <label>Emergency Contact Phone</label>
              <input
                type="tel"
                required
                maxLength={10}
                name="emergencyContact.phone"
                value={profileData.emergencyContact?.phone || ""}
                onChange={(e) => {
                  let value = e.target.value;

                  // Remove any non-numeric characters
                  value = value.replace(/\D/g, "");

                  // If the length exceeds 10, trim it to 10 digits

                  handleChange({
                    target: { name: "emergencyContact.phone", value },
                  });
                }}
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
                required
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
