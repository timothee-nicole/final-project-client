import React from 'react'
import { useDrag } from 'react-dnd'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {NavLink} from 'react-router-dom' 
import apiHandler from '../api/apiHandler';

export default function DraggableTour(props) {
   

    const handleDelete = (id) => {
        // console.log(props.id)
        const newTrip = {...props.object.details}
        const objectToFind = newTrip.tour.find(elem => elem._id === props.id)
        const indexToFind = newTrip.tour.indexOf(objectToFind)
        // console.log(indexToFind)
        newTrip.tour.splice(indexToFind, 1)
        apiHandler
            .modifyTrip(props.object.details._id, newTrip)
            .then((apiRes) => {
                window.location.reload(false)
                console.log(apiRes)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [{isDragging}, drag] = useDrag({
        item: {type: 'function', name: props.name, image: props.image, id: props.id, object:props},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
      })
      console.log(props)
    return (
        <div className="activities-card" ref={drag}>
            <NavLink exact to={`/activity/${props.id}`}>
            <img style={{width: '100%'}} src={props.image} alt={props.name}/>
            <p>{props.name.substr(0, 23)}...</p>
            <DeleteForeverIcon onClick={() => handleDelete(props.id)}/>
            </NavLink>
        </div>
    )
}


