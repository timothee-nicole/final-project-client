import React, { Component } from 'react'
import { useState, createContext } from 'react';
import DraggableTour from './DraggableTour';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DropTarget from './DropTarget';

export const CardContext = createContext({
	markAsDone: null,
});


export default function DragAndDrop(props) {
    // console.log(props.details.tour)

    const [tourList, setTourList] = useState(
		props.details.tour
    );
    
    const handleDrop = () => {
        console.log('toto')
    } 

    const markAsDone = _id => {
        // console.log(_id, tourList)
        const tour = tourList.find((tour, i) => {
 
        return tour._id === _id})
        // console.log(tours)
      
        const copy = {...tour}
        copy.status = "done"
		setTourList(tourList.map(tour => tour._id === _id ? copy: tour ));
    };
    
    
    return (
    <CardContext.Provider value={{markAsDone}}>
        <div>
            <div className="activities-and-points">
                <div className='all-activities'>
                    <h1>Your Activities: </h1>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center", }}>
                        {props.details ? props.details.tour.map((obj, i) => {
                            return ( <React.Fragment >
                                <DndProvider backend={HTML5Backend}>
                                    <DraggableTour key={i} link={obj.bookingLink} image={obj.pictures[0]} name={obj.name} id={obj._id}/>
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
                        {props.details && props.numberOfDay.map((elem, i) => {
                            return (<tr key={i}>
                                <td> Day {elem}</td>
                                    <DndProvider backend={HTML5Backend}>
                                        <DropTarget onDrop={handleDrop} >
                                        {tourList
							.filter((task, i) => task.status === 'done')
							.map((task, i) => (
								<DraggableTour link={task.bookingLink} image={task.pictures[0]} name={task.name} />
							))}
                                        </DropTarget>
                                    </DndProvider>   
                            </tr>
                            )
                        })}
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
        </div>
    </CardContext.Provider>
    )
}
