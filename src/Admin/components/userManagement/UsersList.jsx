import React, { useEffect, useRef, useState } from "react";
import moreIcon from "../Assets/Images/more.png";
import EditUser from "./EditUser";
import { allUsers } from "../../api/baseApi";

const UsersList = ({ editAction }) => {
  const [editUser, setEditUser] = useState({ open: false, data: null });
  const [userList, setUserList] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setEditUser(false);
      }
    }

    if (editUser) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editUser]);

  useEffect(() => {
    const getUsers = async () => {
      console.log("strict");
      try {
        const { data } = await allUsers();
        let reverseUsers =data?.users?.reverse()
        setUserList(reverseUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [editAction]);

  console.log(userList && userList[0].profilePic);
  return (
    <div className="users-list-cnt">
      <div className="users-details-header">
        <p className="user-name-cnt ">username</p>
        <p className="user-name-cnt">position</p>
        <p className="user-name-cnt">compnay</p>
        <p className="user-date-cnt">Joined date</p>
        <p style={{ width: ".5rem" }}></p>
      </div>

      {userList &&
        userList?.map((user, index) => (
          <div className="user-details-cnt" key={index}>
            <div className="user-name-cnt">
              <img
                src={`data:image/png;base64,${user?.profilePic}`}
                alt="profile-icon"
                className="profile-img"
              />
              <div className="name-cnt">
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <p className="user-name-cnt details-text">{user?.position}</p>
            <p className="details-text user-name-cnt">{user?.companyname}</p>
            <p className="details-text user-date-cnt">{user?.joinedDate}</p>
            <img
              src={moreIcon}
              alt="more"
              className="more-icon"
              onClick={() => setEditUser({ open: true, data: user })}
            />
          </div>
        ))}
      <div ref={wrapperRef}>
        <EditUser open={editUser} openEdit={editAction} data={editUser.data} />
      </div>
    </div>
  );
};

export default UsersList;
