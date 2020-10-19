import React, { Component } from 'react'
import apiHandler from "../api/apiHandler";
import {withUser} from '../components/Auth/withUser'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

class UpdateProfile extends Component {

    state = {

    }

    handleChange = (event) => {
        const value =
          event.target.type === "file"
            ? event.target.files[0]
            : event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value;
    
        const key = event.target.name;
        
        this.setState({ [key]: value, });
        console.log(this.state)
      };

      handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
   
        apiHandler
        .modifyProfile(this.state)
      
        .then((res) => {
          console.log(res)
          this.props.context.setUser(res.data);
          console.log(res)
          })
          .catch((error) => {
            console.log(error);
          });
      };

    render() {
        const userProfile = this.props.context.user
        // console.log(this.state)
        return (
            <div className='backgroundFormSignUp'>

      <form onSubmit={this.handleSubmit} className="form">
      <img src="/favicon.ico" alt="toto" /><br />
      <h1>Update your Infos</h1><br />
       
        <TextField style={{width: '40%'}} variant="outlined" defaultValue={userProfile.firstName} type="text" id="firstName" label='First Name'  name="firstName" onChange={this.handleChange}/><br />

        <TextField style={{width: '40%'}} variant="outlined" defaultValue={userProfile.lastName} type="text" id="lastName" label='Last Name' name="lastName" onChange={this.handleChange} /><br />
        
        {/* <TextField style={{width: '40%'}} variant="outlined" type="date" id="birthDate" name="birthDate"/><br /> */}
        
        <TextField style={{width: '40%'}} variant="outlined" defaultValue={userProfile.email} type="email" id="email" label='E-mail' name="email" onChange={this.handleChange} /><br />
        
        {/* <TextField style={{width: '40%'}} variant="outlined" value={userProfile.password} type="password" id="password" label='Password' name="password" onChange={this.handleChange} /><br /> */}


        <Button color="primary" variant="contained" onClick={this.handleSubmit}>Submit</Button>
      </form>
      </div>
        )
    }
}

export default withUser(UpdateProfile)
