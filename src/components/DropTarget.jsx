import React, {useCallback} from 'react'
import { useDrop } from 'react-dnd'

export default function DropTarget({onDrop}) {
    const handleDrop = useCallback((toto) => {
        console.log(toto); // return toto
    });
    const [{canDrop}, drop] = useDrop({
        accept: 'function', //required
        drop(obj) {         //methode de UseDrop
            onDrop(obj)
            return console.log('hello')
        },
        collect: (monitor) => ({
        //     canDrop: monitor.canDrop(),
            dropResult: monitor.getDropResult()
        }) 
    });

  return (<td ref={drop} style={{heigth: '50px', width: '50px', margin: '10px', padding:'10px', background:'#fff'}} onDrop={handleDrop}> Drop Target </td>)
}