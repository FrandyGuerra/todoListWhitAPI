import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './task.css'


const Task = () => {
    const [tarea, setTarea] = useState([])
    const [counter, setCounter] = useState(0);

    const addTask = (e) => {
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
            setTarea([...tarea, {
                done: false,
                label: e.target.value
            }]);
            setCounter(tarea.length + 1)

            e.target.value = '';
        }
    }

    const DeleteItems = (indexItem) => {
        setTarea((valores) =>
            valores.filter((valor, index) => index !== indexItem)
        );
        setCounter(tarea.length - 1)
    };

    useEffect(() => {
        if (tarea.length >= 0) {
            actualizarLista(tarea);
            setCounter(tarea.length)
        }
    }, [tarea]) // cuando se modifica el estado tarea

    useEffect(() => {
        getList();
        setCounter(tarea.length)
    }, []) // arreglo vacio si queremos que se ejecute solamente cuando el componente se monta

    const getList = async (tareas) => {
        try {
            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/FrandyGuerra');
            const data = await response.json();
            setTarea(data);

        }
        catch (error) {
            console.log(error);
        }

    }

    const actualizarLista = (tareas) => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/FrandyGuerra', {
            method: 'PUT',
            body: JSON.stringify(tareas),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <input id="input" className="p-3" type="text" placeholder="What needs to be done?" onKeyDown={addTask} />
            <ul className="list-group">
                {
                    tarea.map((valor, index) => {
                        return (
                            <>
                                <li className="list-group-item task" key={index}>
                                    <div>{valor.label}</div>
                                    <span className="borrar" onClick={() => DeleteItems(index)}>X</span>
                                </li>
                            </>
                        )
                    })
                }
                <span className="list-group-item" id="contador">{counter} {"items"}</span>
                <span className="sombra-1"></span>
                <span className="sombra-2"></span>
            </ul>

        </>
    )
}

export default Task;