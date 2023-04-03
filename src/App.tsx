import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';


export type TodoListsType = {
   id: string
   title: string
   filter: FilterValuesType
}

type TaskStateType = {
   [todoListId: string]: Array<TaskType>
}

function App() {

   const todoListId1 = v1()
   const todoListId2 = v1()

   let [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
      [
         {id: todoListId1, title: 'What to learn', filter: 'active'},
         {id: todoListId2, title: 'What to buy', filter: 'all'},
      ]
   )

   let [tasks, setTasks] = useState({
      [todoListId1]: [
         {id: v1(), title: 'HTML&CSS', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'ReactJS', isDone: false},
         {id: v1(), title: 'Rest API', isDone: false},
      ],
      [todoListId2]: [
         {id: v1(), title: 'Water', isDone: true},
         {id: v1(), title: 'Bread', isDone: true},
         {id: v1(), title: 'Salt', isDone: false},
         {id: v1(), title: 'Bear', isDone: false},
      ]
   });

   function removeTask(todoListId: string, taskId: string) {
      setTasks({...tasks, [todoListId]: tasks[todoListId].filter(r => r.id !== taskId)})
   }

   function addTask(todoListId: string, title: string) {
      let newTasks = {id: v1(), title, isDone: false}
      setTasks({...tasks, [todoListId]: [newTasks, ...tasks[todoListId]]})
   }

   const changeIsDone = (todoListId: string, newId: string, newIsDone: boolean) => {
      setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === newId ? {...el, isDone: newIsDone} : el)})
   }

   function changeFilter(todoListId: string, valueFilter: FilterValuesType) {
      setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: valueFilter} : el));
   }

   const removeTodoList = (todoListId: string) => {
      setTodoLists(todoLists.filter(tl => tl.id === todoListId))
      delete tasks[todoListId]
   }

   const getFilteredTaskForRender = (taskList: Array<TaskType>, filterValue: FilterValuesType) => {
      switch (filterValue) {
         case 'active':
            return taskList.filter(t => !t.isDone);
         case 'completed':
            return taskList.filter(t => t.isDone);
         default:
            return taskList
      }
   }

   const TodoListComponents = todoLists.map(tl => {
      const taskForRender: Array<TaskType> = getFilteredTaskForRender(tasks[tl.id], tl.filter)
      return (
         <Todolist
            key={tl.id}
            todoListId={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={taskForRender}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeIsDone={changeIsDone}
            removeTodoList={removeTodoList}
         />
      )
   })

   return (
      <div className="App">
         {TodoListComponents}
      </div>
   );
}

export default App;
