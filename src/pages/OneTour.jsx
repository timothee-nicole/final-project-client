import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import Button from '@material-ui/core/Button'
import '../styles/one-tour.css'

export default class OneTour extends Component {

    state = {
        tour: {}
    }


    componentDidMount() {
        apiHandler
            .getOneActivity(this.props.match.params.id)
            .then((apiRes) => {
                this.setState({
                    tour: apiRes.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        console.log(this.state.tour);
        return (
            <div className="one-tour">
                {this.state.tour.name ? (<>
                    <h1>{this.state.tour.name}</h1>
                    <img src={this.state.tour.pictures[0]} alt={this.state.tour.name}/>
                    <h2> Rate : {'★'.repeat(Math.round(this.state.tour.rating))}
                        {'☆'.repeat(5 - Math.round(this.state.tour.rating))}</h2>
                    <h2>Price : from €{this.state.tour.price.amount} per person</h2>
                    <Button style={{margin: "10px"}} color="primary" variant="contained" href={this.state.tour.bookingLink} target="_blank">Book Now </Button>
                    <p>{this.state.tour.shortDescription}</p>


                </>) : (<div>Content is loading</div>)}
            </div>
        )
    }
}
