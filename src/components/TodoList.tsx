import React, {useState} from 'react';

export type TaskType = {
   id: number,
   title: string,
   isDone: boolean,
}

type ListProps = {
   title: string;
   tasks: Array<TaskType>;
   removeTask: (taskID: number) => void;
   // filterTask: (buttonNames: string) => void;
}

export const TodoList = (props: ListProps) => {
   let [filterValue, setFilterValue] = useState('All')
   let currentFilter = props.tasks;
   if(filterValue === "Active") {
      currentFilter = (props.tasks.filter(a => !a.isDone))
   }
   if (filterValue === "Completed") {
      currentFilter = (props.tasks.filter(a => a.isDone))
   }

   const filterTask = (buttonNames: string) => {
      setFilterValue(buttonNames)
   }

   return (
      <div className="App">
         <div>
            <h3>{props.title}</h3>
            <div>
               <input/>
               <button>+</button>
            </div>
            <ul>
               {currentFilter.map((el) => {
                  return (
                     <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                     </li>
                  )
               })}
            </ul>
            <div>
               <button onClick={ () => filterTask("All") }>All</button>
               <button onClick={ () => filterTask("Active") }>Active</button>
               <button onClick={ () => filterTask('Completed') }>Completed</button>
            </div>
         </div>
      </div>
   );
};