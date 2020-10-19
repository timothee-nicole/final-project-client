import React from 'react'
import '../styles/eachTour.css'
import Button from '@material-ui/core/Button'

export default function eachTour(props) {
    let tours = props.tourList
    console.log(tours ? tours : 'is loading')
    return (
        <div>
            {tours ? tours.map((obj) =>{
                return (
                    <div className="tourCards">
                    <img src={obj.pictures[0]} alt={obj.name} />
                    <div className="tourDescription">
                        <h2>{obj.name}</h2>
                        <p>{obj.shortDescription}</p>
                    </div>
                    <div className="bookTour">
                        <h3>From € {obj.price.amount} per person</h3><br />
                        <Button onClick={this.addToTours} color="primary" variant="contained">Add to my trip</Button><br />
                        <Button href={obj.bookingLink} color="secondary" variant="contained">Book Now</Button>
                    </div>
                    </div>
            )}) : (<h1> Content is loading </h1>)}
        </div>
    )
}
