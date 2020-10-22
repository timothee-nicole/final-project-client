import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button'
import { withUser } from '../../components/Auth/withUser'
import '../../styles/oneTrip.css'
import DragAndDrop from '../../components/DragAndDrop';

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

        
        handleTour = (tour) => {
            this.setState({trip:tour})
        }
    
    render() {
        // this.state.numberOfDay && this.state.trip.tour.map((obj) => console.log(obj))
        // console.log(typeof(DraggableTour))
        return (
            <section className='one-trip'>
            <div className="destination" style={{backgroundImage: `url('/images/${this.state.trip.destination}.jpg')`, backgroundRepeat: "no-repeat"}}>
                <h1>Your trip to {this.capitalize(this.state.trip.destination)} will be unforgettable!</h1>
                <p>{this.capitalize(this.state.trip.destination)} is a really nice destination, it's sure that you will enjoy your trip ! But why not adding some spices to this adventure ? </p>
                <Button color="primary" variant="contained">
                    <Link to={{pathname: "/search/activities", state:{trip: this.state.trip} }}>
                        Search activities
                    </Link> 
                </Button>&nbsp;
                <Button color="primary" variant="contained">
                    <Link to={{pathname: "/search/points-of-interest", state:{trip: this.state.trip} }}>
                        Search Points of Interest
                    </Link> 
                </Button>&nbsp;
            </div>
            {this.state.numberOfDay ? <DragAndDrop handleTour={this.handleTour} details={this.state.trip} numberOfDay={this.state.numberOfDay}/> : <div>Content is loading ...</div>}
            </section>
        )
    }
}

export default withUser(OneTrip)