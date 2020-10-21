import React, {useCallback, useContext} from 'react'
import { useDrop } from 'react-dnd'
import { CardContext } from './DragAndDrop';


export default function DropTarget(props) {

    const handleDrop = () => {
        console.log('toto')
    }

    const {markAsDone} = useContext(CardContext)
    const [{dropResult, isOver}, drop] = useDrop({
        accept: 'function', 
        drop: (obj, monitor) => { markAsDone(obj.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            dropResult: monitor.getItem(),
        }) 
    });
    // console.log(dropResult)

  return (<td ref={drop} style={{heigth: '50px', width: '50px', margin: '10px', padding:'10px', background:'#fff', backgroundColor: isOver ? 'red' : "white"}} onDrop={handleDrop} label={props.key}>{props.children} Drop Target </td>)
}