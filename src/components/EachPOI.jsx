import React from 'react'
import '../styles/eachTour.css'
import Button from '@material-ui/core/Button'

export default function eachTour(props) {
    let tours = props.pointsOfInterest
    console.log(props.pointsOfInterest)
    return (
        <div>
            {tours ?
                 (
                    <div className="display-item">
                    <div className="tourDescription">
                        <h2>{tours.properties.name}</h2>
                        <p> rate: 
                        {'★'.repeat(Math.round(tours.properties.rate))}
                        {'☆'.repeat(3 - Math.round(tours.properties.rate))}</p>
                        <p>Tags: {tours.properties.kinds.replaceAll(',', ', ').replaceAll('_', ' ')}</p>  
                    </div>
                    <div className="bookTour">
                        <Button onClick={() => props.addToTrip({geometry: tours.geometry, properties: tours.properties})} color="primary" variant="contained">
                        Add to my trip
                        </Button>
                    </div>
                    </div>
            ) : console.log('Content is loading')}
        </div>
    )
}