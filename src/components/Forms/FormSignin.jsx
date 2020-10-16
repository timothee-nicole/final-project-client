import React, { Component } from "react";
import Button from '@material-ui/core/Button'
import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import TextField from '@material-ui/core/TextField'
import '../../styles/form.css'

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",

  };

  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

        
        this.setState({ [key]: value });
      };
      
      handleSubmit = (event) => {
        event.preventDefault();
        
        apiHandler
        .signin(this.state)
        .then((data) => {
          this.context.setUser(data);
          this.props.history.push("/");
        })
        .catch((error) => {
          console.log(error);
          // Display error message here, if you set the state
        });
        
    }
      render() {
        console.log(this.state)
    return (
      <div className='backgroundFormSignIn'>
      {/* // rajouter le handlesubmit onkeypress 13(Je crois) si t'as le temps */}
      <form onChange={this.handleChange} onSubmit={this.handleSubmit} className="form">
      <img src="/favicon.ico" alt="toto" /><br />
      <h1>Please Sign In</h1>
        {/* <label htmlFor="email">Email</label> */}
        <TextField style={{width: '40%'}} type="email" id="email" name="email" label="E-mail" variant="outlined" className="input"/><br />
        
        {/* <label htmlFor="password">Password</label> */}
        <TextField style={{width: '40%'}} type="password" id="password" variant="outlined" label="Password" name="password" className="input"/>
        <br />
        <Button color="primary" variant="contained" onClick={this.handleSubmit}>Submit</Button>
      </form>
      </div>
    );
  }
}

export default withRouter(FormSignin);
