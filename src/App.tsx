import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";

function App() {
   let [tasks, setTasks] = useState([
      { id: 1, title: "HTML&CSS", isDone: true },
      { id: 2, title: "JS", isDone: true },
      { id: 3, title: "ReactJS", isDone: false }
   ])

   const removeTask = (taskID: number) => {
      setTasks(tasks.filter(a => a.id !== taskID))
   }

   // let [filterValue, setFilterValue] = useState('All')
   // const filterTask = (buttonNames: string) => {
   //    setFilterValue(buttonNames)
   // }
   //
   // let currentfilter = tasks;
   // if(filterValue === "Active") {
   //    currentfilter = (tasks.filter(a => !a.isDone))
   // }
   // if (filterValue === "Completed") {
   //    currentfilter = (tasks.filter(a => a.isDone))
   // }
   // if (filterValue === "All") {
   //    currentfilter = tasks;
   // }


   return (
      <div className="App">
         <TodoList
            title={"What to learn"}
            tasks={tasks}
            removeTask={removeTask}
            // filterTask={filterTask}
         />
      </div>
   );
}

export default App;


