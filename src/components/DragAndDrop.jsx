import React, { Component, useCallback } from 'react'
import { useState, createContext } from 'react';
import DraggableTour from './DraggableTour';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DropTarget from './DropTarget';
import apiHandler from '../api/apiHandler';

export const CardContext = createContext({
	markAsDone: null,
});


export default function DragAndDrop(props) {
    console.log(props.details._id)

    const [tourList, setTourList] = useState(
		props.details.tour
    );

    const [uniqueDrop, setUniqueDrop] = useState({accepts: 'function'})
    
    const handleDrop = (e, item) => {
        // console.log(e, 'toto', item)
       
        // const {name} = item;
        // setUniqueDrop()
    }

    const markAsDone = (_id, index) => {
        const newTrip = {...props.details}
        // console.log(newTrip) // index + 1 c'est le numero de jour, _id c'est l'id 
        newTrip.organisation.push({tourId: _id, day: index })
        const tripToModifyId = newTrip._id

        console.log("newTrip : ", newTrip)
        apiHandler
            .modifyTrip(props.details._id, newTrip)
            .then((apiRes) => {
                // console.log(apiRes)
            })
            .catch((err) => {
                // console.log(err)
            })
        // console.log(_id, tourList)
        const tour = tourList.find((tour, i) => {
 
        return tour._id === _id})
        // console.log(tours)
      
        const copy = {...tour}
        copy.day = `day${index}`


        
		setTourList(tourList.map(tour => tour._id === _id ? copy : tour ));
    };
    

    console.log(props.details)
    return (
    <CardContext.Provider value={{markAsDone}}>
        <div>
            <div className="activities-and-points">
                <div className='all-activities'>
                    <h1>Your Activities: </h1>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center", }}>
                        {props.details ? props.details.tour.map((obj, i) => {
                            return ( <React.Fragment key={i}>
                                <DndProvider backend={HTML5Backend}>
                                    <DraggableTour link={obj.bookingLink} image={obj.pictures[0]} name={obj.name} id={obj._id} object={props} onDrop={handleDrop}/>
                                </DndProvider>
                            </React.Fragment>)
                    }) : (<div> Content is loading</div>)}
                </div>
            </div>
                <h1>Your Points of Interest: </h1>
                    <div style={{display: "flex", justifyContent:"center", flexDirection:"column", overflowY: "scroll", height: "100px", background: "white"}}>
                        {props.details ? props.details.pointsOfInterest.map((obj, i) => {
                            return (<div key={i} style={{display: "flex", flexDirection: "column", margin: "5px"}}>
                                <h1>{obj.properties.name}</h1>
                                <p>{'★'.repeat(Math.round(obj.properties.rate))}
                                {'☆'.repeat(3 - Math.round(obj.properties.rate))}</p>
                            </div>)
                    }
                    ) : (<div>content is loading</div>)}
            </div>
        </div>
                <table>
                    <thead>
                    <tr>
                        {props.details && props.numberOfDay.map((elem, i) => {
                            return (<td key={i}>Day {elem}</td>   )
                        })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {props.details && props.numberOfDay.map((elem, indexOfDays) => {
                            return (<React.Fragment key={indexOfDays}>
                                <DndProvider backend={HTML5Backend}>
                                {props.details.organisation[0].tripId ? ( 
                                    props.details.organisation.map((obj) =>
                                     (<DropTarget index={obj.day}><DraggableTour image={obj.tripId.pictures[0]} name={obj.tripId.name} /></DropTarget>)) 
                                     ) : (
                                    <DropTarget index={indexOfDays} onDrop={handleDrop} >{
                                        tourList
							            .filter((task, i) => task.day === `day${indexOfDays}`)
							            .map((obj, i) => (
								        <DraggableTour link={obj.bookingLink} image={obj.pictures[0]} name={obj.name} onDrop={handleDrop} />
							            ))}
                                    </DropTarget>
                                    )
                            }
                                </DndProvider>    
                            </React.Fragment>)
                        })}
                            
                        </tr>
                    </tbody>
                </table>
								{/* <DraggableTour object={props.object} link={props.details.tour[2].bookingLink} image={props.details.tour[2].pictures[0]} name={props.details.tour[2].name} /> */}
        </div>
    </CardContext.Provider>
    )
}
