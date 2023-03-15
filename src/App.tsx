import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type filterValueType = "all" | 'active' | "completed"

function App() {
   let [tasks, setTasks] = useState([
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "RestAPI", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
   ])

   const removeTask = (taskID: string) => {
      setTasks(tasks.filter(a => a.id !== taskID))
   }

   const addTask = (newTaskTitle: string) => {
      const newTask = {
         id: v1(),
         title: newTaskTitle,
         isDone: false
      }
      setTasks([newTask, ...tasks])
   }

   let [filterValue, setFilterValue] = useState<filterValueType>('all')
   let currentFilter = tasks;
   if (filterValue === "active") {
      currentFilter = (tasks.filter(a => !a.isDone))
   }
   if (filterValue === "completed") {
      currentFilter = (tasks.filter(a => a.isDone))
   }

   const changeFilter = (value: filterValueType) => {
      setFilterValue(value)
   }

   return (
      <div className="App">
         <TodoList
            title={"What to learn"}
            tasks={currentFilter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
         />
      </div>
   );
}

export default App;


