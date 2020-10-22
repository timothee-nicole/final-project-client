import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/footer.css'

class FooterMain extends Component {
    render() {
        return (
        <section className="footer">
            <div className="footer-info">
                <h2>Made In </h2>&nbsp;
                <img src="/images/js.png" alt="javaScript" style={{width: 'auto', height: "50px"}}/>&nbsp;
                <h2>with</h2>&nbsp;
                <img src="/images/reactjs.png" alt="React" style={{width: 'auto', height: "50px"}}/>&nbsp;
                <h2>&</h2>&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="/images/nodejs.png" alt="Node" style={{width: 'auto', height: "50px"}}/>&nbsp;&nbsp;&nbsp;&nbsp;

                <h2>by Timothée Nicole for</h2>&nbsp;&nbsp;&nbsp;
                
                <a href="https://www.ironhack.com" target="_blank"><img src="/images/ironhack.png" alt="IronHack" style={{width: 'auto', height: "50px"}}/></a>&nbsp;
            </div>
            
            <div className="social-network">
            <a href="https://github.com/timothee-nicole" target="_blank"><img src="/images/github.png" alt="GitHub" style={{width: 'auto', height: "50px"}}/></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/timoth%C3%A9e-nicole/" target="_blank"><img src="/images/ln.png" alt="LinkdIn" style={{width: 'auto', height: "50px"}}/></a>&nbsp;&nbsp;&nbsp;&nbsp;
                
            </div>
                
        </section>
        )
    }
}
export default FooterMain