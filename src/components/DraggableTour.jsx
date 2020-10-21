import React from 'react'
import { useDrag } from 'react-dnd'
import {NavLink} from 'react-router-dom' 

export default function DraggableTour(props) {
    const [{isDragging}, drag] = useDrag({
        item: {type: 'function', name: props.name, image: props.image, id: props.id},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
      })
    return (
        <div className="activities-card" ref={drag}>
            {/* <NavLink exact to={props.link}> */}
            <img style={{width: '100%'}} src={props.image} alt={props.name}/><p>{props.name.substr(0, 25)}...</p>
            {/* </NavLink> */}
        </div>
    )
}


