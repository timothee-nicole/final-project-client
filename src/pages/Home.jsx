import React from "react";
import '../styles/home.css'
import Button from '@material-ui/core/Button'
import {withUser} from '../components/Auth/withUser'
import { NavLink } from "react-router-dom";


class Home extends React.Component {
  render() {
    console.log(this.props.context.isLoggedIn)

    return (
      <>
      <div className="home">
        <h1>Welcome To Trip & Karmeliet</h1>
        <p>With T&K planning your holiday has never been so easy !</p>
        <p> Pick a destination, choose your activities, and hop-on the next plane to live an unforgettable adventure</p><br />
      {this.props.context.isLoggedIn ?
      (<NavLink exact to="/create-trip"><Button variant="contained" color="primary">Create my first Trip !</Button></NavLink>)
      : 
      (<NavLink exact to="/signup"><Button variant="contained" color="primary">Create my Account Now !</Button></NavLink>)}
      </div>
      <div className="image-line">
      <div>BARCELONA - BERLIN - PARIS - LONDON</div>
      </div>
      </>

    );
  }
}

export default withUser(Home);
