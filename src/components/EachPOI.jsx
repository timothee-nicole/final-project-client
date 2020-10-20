import React from 'react'
import '../styles/eachTour.css'
import Button from '@material-ui/core/Button'

export default function eachTour(props) {
    let tours = props.pointsOfInterest
    return (
        <div>
            {tours ?
                 (
                    <div className="display-item">
                    {/* <img src="https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900" alt={obj.properties.name} /> */}
                    <div className="tourDescription">
                        <h2>{tours.properties.name}</h2>
                        <p> rate: 
                        {'★'.repeat(Math.round(tours.properties.rate))}
                        {'☆'.repeat(3 - Math.round(tours.properties.rate))}</p>
                        <p>Tags: {tours.properties.kinds.replaceAll(',', ', ').replaceAll('_', ' ')}</p>  
                    </div>
                    <div className="bookTour">
                        <Button onClick={() => props.addToTrip(tours._id)} color="primary" variant="contained">
                        Add to my trip
                        </Button>
                    </div>
                    </div>
            ) : console.log('Content is loading')}
        </div>
    )
}