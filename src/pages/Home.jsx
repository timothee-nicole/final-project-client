import React from "react";
import '../styles/home.css'
import Button from '@material-ui/core/Button'


class Home extends React.Component {
  render() {
    return (
      <>
      <div className="home">
        <h1>Welcome To Trip & Karmeliet</h1>
        <p>With T&K planning your holiday has never been so easy !</p>
        <p> Pick a destination, choose your activities, and hop-on the next plane to live an unforgettable adventure</p><br />
      <Button variant="contained" color="primary">Create my first Trip !</Button>
      </div>
      <div className="image-line">
      <div>BARCELONA - BERLIN - PARIS - LONDON</div>
      </div>
      </>

    );
  }
}

export default Home;
