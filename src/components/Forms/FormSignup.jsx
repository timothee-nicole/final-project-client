import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    lastName:"",
    firstName:"",
    birthDate:"",
  };

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

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className='backgroundFormSignUp'>

      <form onChange={this.handleChange} onSubmit={this.handleSubmit} className="form">
      <img src="/favicon.ico" alt="toto" /><br />
      <h1>Please Sign Up</h1><br />
       
        <TextField style={{width: '40%'}} variant="outlined" type="text" id="firstName" label='First Name' name="firstName" /><br />

        <TextField style={{width: '40%'}} variant="outlined" type="text" id="lastName" label='Last Name' name="lastName" /><br />
        
        {/* <TextField style={{width: '40%'}} variant="outlined" type="date" id="birthDate" name="birthDate"/><br /> */}
        
        <TextField style={{width: '40%'}} variant="outlined" type="email" id="email" label='E-mail' name="email" /><br />
        
        <TextField style={{width: '40%'}} variant="outlined" type="password" id="password" label='Password' name="password" /><br />


        <Button style={{margin: "10px"}} color="primary" variant="contained" onClick={this.handleSubmit}>Submit</Button>
        <a href="/signin" style={{textDecoration: "underline", color: "blue" , margin: "10px"}}>Already have an account ? Sign in</a>
        <p>By signing up, you agree to CodePen's <a href="/error" style={{textDecoration: "underline", color: "blue"}}>Terms of Service</a>  and <a href="/error" style={{textDecoration: "underline", color: "blue"}}>Privacy Policy.</a></p>
      </form>
      </div>
    );
  }
}

export default withRouter(FormSignup);
