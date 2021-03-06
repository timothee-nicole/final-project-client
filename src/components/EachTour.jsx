import React from 'react'
import '../styles/eachTour.css'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'

export default function eachTour(props) {
    let tours = props.tourList
    console.log(props)
    return (
        <div>
        <div className='back-button'>
            <NavLink exact to={`/trip/${props.id}`}><Button color="primary" variant="contained" className='back-button'>Back to the Trip Page</Button></NavLink>
        </div>
            {tours ? tours.map((obj, i) =>{
                return (
                    <div className="tourCards" key={i}>
                    <img src={obj.pictures[0]} alt={obj.name} />
                    <div className="tourDescription">
                        <NavLink exact to={`/activity/${obj._id}`}>
                        <h2>{obj.name}</h2>
                        </NavLink>
                        <p>{obj.shortDescription}</p>
                    </div>
                    <div className="bookTour">
                        <h3>From € {obj.price.amount} per person</h3><br />
                        <Button key={i}  onClick={() => props.addToTrip(obj._id)} color="primary" variant="contained">
                        Add to my trip
                        </Button><br />
                        <Button href={obj.bookingLink} color="secondary" variant="contained">Book Now</Button>
                    </div>
                    </div>
            )}) : (<h1> Content is loading </h1>)}
        </div>
    )
}
