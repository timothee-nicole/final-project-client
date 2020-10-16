import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'

class OneTrip extends Component {

    state = {
        trip: {}
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    numberOfDays = (dateOne, dateTwo) => {
        const oneDay = 24 * 60 * 60 * 1000
        const numberOfDays = Math.round(Math.abs((dateOne - dateTwo) / oneDay))
        return numberOfDays
    }

    componentDidMount() {
        apiHandler
            .getOneTrip(this.props.match.params.id)
            .then((apiRes) => {
                console.log(apiRes);
                this.setState({
                    trip: apiRes
                })
            })
            .catch((apiErr) => {
                console.log(apiErr)
            })
    }
    render() {
        // console.log(this.props.match.params.id)
        return (
            <div>
                <h1>Wow you are going to {this.capitalize(this.state.trip.destination)}</h1>
            </div>
        )
    }
}

export default OneTrip