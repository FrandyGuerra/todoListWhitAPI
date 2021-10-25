import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './task.css'


const Task=()=>{
     const [tarea,setTarea]= useState([]);
     const [counter,setCounter]=useState(0);

     const addTask=(e)=>{
        if(e.keyCode===13 && e.target.value!==""){
            setCounter(tarea.length+1); 
            setTarea([...tarea, e.target.value])  
            e.target.value=""
        }   
    }

    const DeleteItems = (indexItem) => {
        setTarea((valores) =>
          valores.filter(( valor, index) => index !== indexItem)
        );
        setCounter(tarea.length-1)
      };
    return(
        <>
        <input id="input" className="p-3" type="text" placeholder="What needs to be done?" onKeyDown={addTask}/>
        <ul className="list-group">
        {
        tarea.map((valor ,index)=>{
           return (
               <>
                <li className="list-group-item task" key={index}>
                    <div>{valor}</div>
                    <span className="borrar" onClick={()=>DeleteItems(index)}>X</span>
                </li>
                </>
            )
        })
        } 
        <span className="list-group-item"id="contador">{counter} {"items"}</span>
        <span className="sombra-1"></span>
        <span className="sombra-2"></span>
        </ul>
        
        </>
    )

}

export default Task;