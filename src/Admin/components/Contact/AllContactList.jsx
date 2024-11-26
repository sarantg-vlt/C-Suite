const AllContactList = ({contacts}) => {
  console.log(contacts);
  
  return (
    <div className="users-list-cnt">
    <div className="users-details-header">
      <p className="user-name-cnt ">First Name</p>
      <p className="user-name-cnt">Last Name</p>
      <p className="user-name-cnt">Email</p>
      <p className="user-name-cnt">Company</p>
      <p className="user-date-cnt">Meassage</p>
      <p style={{ width: ".5rem" }}></p>
    </div>
    {contacts.data && contacts.data?.map((contact)=>(
      <div className="user-details-cnt" key={contact._id}>
        <div className="user-name-cnt">{contact.firstname}</div>
        <div className="user-name-cnt">{contact.lastname}</div>
        <div className="user-name-cnt">{contact.email}</div>
        <div className="user-name-cnt">{contact.companyname}</div>
        <div className="user-name-cnt">{contact.message}</div>
      </div>
    ))}
    {/* {instructorsList &&
      instructorsList?.map((instructor, index) => (
        <div className="user-details-cnt" key={index}>
          <div className="user-name-cnt">
            <img
              src={searchIcon}
              alt="profile-icon"
              className="profile-img"
            />
            <div className="name-cnt">
              <h3>{instructor?.name}</h3>
              <p>{instructor?.email}</p>
            </div>
          </div>
          <p className="user-name-cnt details-text">{instructor?.position}</p>
          <p className="details-text user-name-cnt">
            {instructor?.companyname}
          </p>
          <p className="details-text user-date-cnt">july 4, 2023</p>
          <img
            src={moreIcon}
            alt="more"
            className="more-icon"
            onClick={() =>
              // setEditInstructor({ open: true, data: instructor })
            }
          />
        </div>
      ))} */}

    {/* <div ref={wrapperRef}>
      <EditInstructor
        open={editInstructor}
        openEdit={editAction}
        data={editInstructor.data}
      />
    </div> */}
  </div>
  )
}

export default AllContactList