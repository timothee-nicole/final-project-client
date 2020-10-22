import React, {
     useContext} from 'react'
import { useDrop } from 'react-dnd'
import { CardContext } from './DragAndDrop';


export default function DropTarget(props) {

    const handleDrop = ( e , index) => {
        // console.log(e, 'titi', index)

    }

    const {markAsDone} = useContext(CardContext)
    const [{dropResult, isOver}, drop] = useDrop({
        accept: 'function', 
        drop: (obj, monitor) => { markAsDone(obj.id, props.index)},
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            dropResult: monitor.getItem(),
        }) 
    });
    // console.log(props.index) // ApiHandler -> set Tour day X == props.index

  return (<td ref={drop} style={{backgroundColor: isOver ? 'cornflowerblue' : "white"}} onDrop={handleDrop} value={props.key}> Drop the Activity here ! {props.children}</td>)
}