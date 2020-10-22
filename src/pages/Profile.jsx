import React from "react";
import { NavLink } from "react-router-dom";
import {withUser} from '../components/Auth/withUser'
import Button from '@material-ui/core/Button'
import '../styles/profile.css'

const Profile = (props) => {
  const userProfile = props.context.user
  
  // console.log(userProfile)
  return (
    <div className='profile'>
      <h1> Hey {userProfile.firstName} !</h1> &nbsp;
    <div className="profile-details">
      <img src={userProfile.profilePicture} alt={userProfile.firstName}/>
      <h3>Please find your information below : </h3>
        <p>First Name : {userProfile.firstName}<br/>
        Last Name : {userProfile.lastName}<br/>
        E-mail : {userProfile.email}</p>
    </div>

   <NavLink to="/profile/edit">
      <Button color="primary" variant="contained">
        Modify My Profile 
      </Button>
    </NavLink>
    </div>
  );
};

export default withUser(Profile);
