import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "../styles/NavMain.css";
import DestinationList from "./DestinationList";
// import { makeStyles } from '@material-ui/core/styles';



 class NavMain extends React.Component {



  toggleDestinationList = () => {
    console.log("titi")
    React.createElement(DestinationList)
  }

  handleLogout = () => {
    apiHandler
      .logout()
      .then(() => {
        this.props.context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    // console.log(this.props.context)
    return (
      <nav className="NavMain">
      <NavLink exact to="/">
        <img src="./images/logo.png" alt="Logo" />
      </NavLink>
          <p onMouseEnter={this.toggleDestinationList}>toto</p>
          
        {this.props.context.isLoggedIn && (
          <React.Fragment>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <ul className="nav-log">
            <li>
              <NavLink to="/profile">
                {this.props.context.user && this.props.context.user.email}
              </NavLink>
            </li>
            <li>
              <p onClick={this.handleLogout}>Logout</p>
            </li>
          </ul>
          </ButtonGroup>
          </React.Fragment>
        )}
        {!this.props.context.isLoggedIn && (
          <React.Fragment>
          
          <ul className="nav-log">
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <li>
              <Button color="secondary" variant="contained">
              <NavLink to="/signin">Log in</NavLink>
              </Button>
            </li>
            <li>
              <Button color="secondary" variant="contained">
              <NavLink to="/signup">Create account</NavLink>
              </Button>
            </li>
            </ButtonGroup>
          </ul>

          </React.Fragment>
        )}
    </nav>
  );
}
};

export default withUser(NavMain);
