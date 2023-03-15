import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {filterValueType} from "../App";

export type TaskType = {
   id: string,
   title: string,
   isDone: boolean,
}

type ListProps = {
   title: string;
   tasks: Array<TaskType>;
   removeTask: (taskID: string) => void;
   changeFilter: (value: filterValueType) => void;
   addTask: (newTaskTitle: string) => void
}

export const TodoList = (props: ListProps) => {

   let renderedTask = props.tasks.map((el) => {
      return (
         <li key={el.id}>
            <input type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={() => removeTaskHandler(el.id)}>X</button>
         </li>
      )
   })

   const [newTaskTitle, setNewTaskTitle] = useState('');

   const addTaskHandler = () => {
      props.addTask(newTaskTitle)
      setNewTaskTitle(' ')
   }

   const textChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
         addTaskHandler()
      }
   }

   const removeTaskHandler = (el: string) => {
      props.removeTask(el)
   }


   const tsarFunction = (filterValue: filterValueType) => {
      props.changeFilter(filterValue)
   }

   return (
      <div className="App">
         <div>
            <h3>{props.title}</h3>
            <div>
               <input
                  value={newTaskTitle}
                  onKeyUp={onKeyPressHandler}
                  onChange={textChangeInputHandler}/>
               <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>{renderedTask} </ul>
            <div>
               {/*<Button name={'All'} callBack={}/>*/}
               <button onClick={() => tsarFunction('all')}>All</button>
               <button onClick={() => tsarFunction('active')}>Active</button>
               <button onClick={() => tsarFunction('completed')}>Completed</button>
            </div>
         </div>
      </div>
   );
};