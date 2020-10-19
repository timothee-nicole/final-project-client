import React from "react";
import { NavLink } from "react-router-dom";
import {withUser} from '../components/Auth/withUser'

const Profile = (props) => {
  const userProfile = props.context.user
  
  console.log(userProfile)
  return (
    <div>
      <h1> Welcome on your Profile Page Dear {userProfile.firstName}</h1>
      <img src={userProfile.profilePicture} alt={userProfile.firstName}/>
      <h3>Please find your information below : </h3>
      <ul>
        <li>First Name : {userProfile.firstName}</li>
        <li>Last Name : {userProfile.lastName}</li>
        <li>E-mail : {userProfile.email}</li>

      </ul>

      I you wish to modify your information, please click <NavLink to="/profile/edit">here</NavLink>
    </div>
  );
};

export default withUser(Profile);
