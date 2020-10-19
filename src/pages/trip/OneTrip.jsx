import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'
import { Link } from "react-router-dom";
import { withUser } from '../../components/Auth/withUser'

class OneTrip extends Component {

    state = {
        trip: {},
        numberOfDay: null,
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    componentDidMount() {  
        apiHandler
            .getOneTrip(this.props.match.params.id)
            .then((apiRes) => {
                // console.log(apiRes);
                const oneDay = 24 * 60 * 60 * 1000
                const numberOfDays = Math.round((Date.parse(apiRes.dateEnd) - Date.parse(apiRes.dateBegin)) / oneDay) +1;
                const days =  [...Array(numberOfDays).keys()].map((elem) => elem+1)
                this.setState({
                    trip: apiRes,
                    numberOfDay: days
                });
                // console.log(days)
            })
            .catch((apiErr) => {
                console.log(apiErr)
            });
        
            
        }
    // componentDidUpdate() {
    //     console.log('tot')
    //         const oneDay = 24 * 60 * 60 * 1000
    //         const numberOfDays = Math.round((Date.parse(this.state.trip.dateEnd) - Date.parse(this.state.trip.dateBegin)) / oneDay) +1;
    //         // const days = new Array(numberOfDays).keys
    //     //    const days =  [...Array(numberOfDays).keys()]
    //     // console.log(days, numberOfDays)
    //     // return days
    // }
    
    
    render() {
        console.log(this.state.numberOfDay)
        // console.log(this.state.trip.dateBegin && Date.parse(this.state.trip.dateBegin))
        // this.calculate().map((elem, i) => {
        //     console.log(elem, i)
        // })
        return (
            <div>
                <h1>Wow you are going to {this.capitalize(this.state.trip.destination)}</h1>
                <Link to={{pathname: "/search", state:{trip: this.state.trip} }}>Search activities and point of interest to add to your trip!</Link>

                <table>
                    <thead>
                        <tr>
                        {this.state.numberOfDay && this.state.numberOfDay.map((elem, i) => {
                            return (<td key={i}> Day {elem}</td>)
                        })}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

export default withUser(OneTrip)