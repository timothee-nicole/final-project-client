import React from 'react'
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
    // console.log(props.details._id)



    // // const [uniqueDrop, setUniqueDrop] = useState({accepts: 'function'})
    
    const handleDrop = (e, item) => {
        // console.log(e, 'toto', item)
       
        // const {name} = item;
        // setUniqueDrop()
    }

    const markAsDone = (_id, index) => {
        const newTrip = {...props.details}

        const org = [...newTrip.organisation]

        org.push({tourId: _id, day: index })
        
        newTrip.organisation = org;

        apiHandler
            .modifyTrip(props.details._id, newTrip)
            .then((apiRes) => {
             
                    props.handleTour(apiRes);
            })
            .catch((err) => {
                // console.log(err)
            })
    
    };
    

     console.log(props.details,"props dets", props.numberOfDay)
    return (
    <CardContext.Provider value={{markAsDone}}>
        <div>
            <div className="activities-and-points">
            </div>
            <div className="points-of-interest">
                <h1>Your Points of Interest : </h1>
                    <div className="scroll-interest" >
                        {props.details ? props.details.pointsOfInterest.map((obj, i) => {
                            return (<div key={i} style={{display: "flex", flexDirection: "column", margin: "5px"}}>
                                <h3>{obj.properties.name}</h3>
                                <p>{'★'.repeat(Math.round(obj.properties.rate))}
                                {'☆'.repeat(3 - Math.round(obj.properties.rate))}</p>
                            </div>)
                    }
                    ) : (<div>content is loading</div>)}
            </div>
            </div>
                <div className='all-activities'>
                    <h1>Your Activities : </h1>
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
            <div className="trip-table">
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
                                     <DropTarget  index={indexOfDays}>
                                     {props.details && props.details.organisation && props.details.organisation.find(p => p.day === indexOfDays) && props.details.organisation.find(p => p.day === indexOfDays).day === indexOfDays ?
                                      <DraggableTour  name={props.details.organisation.find(p => p.day === indexOfDays).tourId.name} image={props.details.organisation.find(p => p.day === indexOfDays).tourId.pictures[0]} link={props.details.organisation.find(p => p.day === indexOfDays).tourId.bookingLink}/> :   null}
                                     </DropTarget>
                                </DndProvider>    
                            </React.Fragment>)})
                        }
                            
                        </tr>
                    </tbody>
                </table>
            </div>					{/* <DraggableTour object={props.object} link={props.details.tour[2].bookingLink} image={props.details.tour[2].pictures[0]} name={props.details.tour[2].name} /> */}
        </div>
    </CardContext.Provider>
    )
}
