import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
// import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {
   AppBar,
   Button, Checkbox,
   Container,
   createTheme, CssBaseline, FormControlLabel, FormGroup,
   Grid,
   IconButton,
   Paper,
   ThemeProvider,
   Toolbar,
   Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {amber, lightGreen} from '@mui/material/colors';
import TodoList, {TaskType} from './Todolist';
import {
   AddTodoListAC,
   ChangeTodoListFilterAC,
   ChangeTodoListTitleAC,
   RemoveTodoListAC,
   todolistReducer
} from './reducer/todolist-reducer';
import {
   ActionsType,
   addTaskAC,
   changeTaskStatusAC,
   changeTaskTitleAC,
   removeTaskAC,
   tasksReducer
} from './reducer/tasks-reducer';

// create
// read
// update
// delete
// CRUD operations
// interface => GUI (CLI, VUI, ....)

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
   id: string
   title: string
   filter: FilterValuesType
   // tasks: Array<TaskType>
}

export type TaskStateType = {
   [todoListId: string]: Array<TaskType>
}

function AppWithReducer(): JSX.Element {
   // BLL:
   const todoListId_1 = v1()
   const todoListId_2 = v1()

   const [todoLists, dispatchToTodolist] = useReducer(todolistReducer, [
      {id: todoListId_1, title: 'What to learn', filter: 'all'},
      {id: todoListId_2, title: 'What to buy', filter: 'all'},
   ]);
   const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
      [todoListId_1]: [
         {id: v1(), title: 'HTML & CSS', isDone: true},
         {id: v1(), title: 'CSS & SCSS', isDone: true},
         {id: v1(), title: 'ES6/TS', isDone: false},
         {id: v1(), title: 'REDUX', isDone: false},
      ],
      [todoListId_2]: [
         {id: v1(), title: 'WATER', isDone: true},
         {id: v1(), title: 'BREAD', isDone: true},
         {id: v1(), title: 'SALT', isDone: false},
         {id: v1(), title: 'BEER', isDone: false},
      ],
   })

   const [isDarkMode, setDarkMode] = useState<boolean>(true)

   const removeTask = (taskId: string, todoListId: string) => {
      // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
      // const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter((task) => task.id !== taskId)
      // const copyTasks = {...tasks}
      // copyTasks[todoListId] = resultOfUpdate
      // setTasks(copyTasks)
      //
      // setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId)})
      const action = removeTaskAC(taskId, todoListId)
      dispatchToTasks(action)
   }
   const addTask = (title: string, todoListId: string) => {
      // const newTask: TaskType = {id: v1(), title, isDone: false}
      // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
      // const resultOfUpdate: Array<TaskType> = [newTask, ...tasksForUpdate]
      // const copyTasks = {...tasks}
      // copyTasks[todoListId] = resultOfUpdate
      // setTasks(copyTasks)
      // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
      const action = addTaskAC(title, todoListId)
      dispatchToTasks(action)
   }
   const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
      // setTasks({...tasks,
      //    [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
      const action = changeTaskStatusAC(taskId, newIsDone, todoListId)
      dispatchToTasks(action)
   }
   const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
      // setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
      const action = changeTaskTitleAC(taskId, newTitle, todoListId)
      dispatchToTasks(action)
   }
   const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
      // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
      // const action = ChangeTodoListFilterAC(filter, todoListId)
      const action = ChangeTodoListFilterAC(filter, todoListId)
      dispatchToTodolist(action)
   }
   const removeTodoList = (todoListId: string) => {
      // setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
      const action = RemoveTodoListAC(todoListId)
      dispatchToTasks(action)
      dispatchToTodolist(action)
      // delete tasks[todoListId]
   }
   const changeTodoListTitle = (newTitle: string, todoListId: string) => {
      // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
      const action = ChangeTodoListTitleAC(newTitle, todoListId)
      dispatchToTodolist(action)
   }
   const addTodoList = (title: string) => {
      // const newTodo: TodoListType = {
      //    id: v1(),
      //    title: title,
      //    filter: 'all'
      // }
      // setTodoLists([...todoLists, newTodo])
      // setTasks({...tasks, [newTodo.id]: []})
      const action = AddTodoListAC(title)
      dispatchToTasks(action)
      dispatchToTodolist(action)
   }

   //UI:
   const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
      switch (filterValue) {
         case 'active':
            return tasksList.filter(t => !t.isDone)
         case 'completed':
            return tasksList.filter(t => t.isDone)
         default:
            return tasksList
      }
   }


   const todoListsComponents = todoLists.map(tl => {
      const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
      return (
         <Grid item>
            <Paper>
               <TodoList
                  key={tl.id}

                  todoListId={tl.id}
                  title={tl.title}
                  tasks={tasksForRender}
                  filter={tl.filter}

                  addTask={addTask}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  removeTodoList={removeTodoList}
                  changeTodoListTitle={changeTodoListTitle}
                  changeTodoListFilter={changeTodoListFilter}
               />
            </Paper>
         </Grid>
      )
   })

   const mode = isDarkMode ? "dark" : "light"
   const customTheme = createTheme({
      palette: {
         primary: amber,
         secondary: lightGreen,
         mode: mode
      }
   })

   return (
      <ThemeProvider theme={customTheme}>
         <CssBaseline />
         <div className="App">
            <AppBar position="static">
               <Toolbar>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{mr: 2}}
                  >
                     <Menu/>
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                     TodoLists
                  </Typography>
                  <FormGroup>
                     <FormControlLabel
                        control={<Checkbox
                           onChange={(e)=>setDarkMode(e.currentTarget.checked)} />}
                        label={isDarkMode ? "Light mode" : "Dark mode"}
                     />
                  </FormGroup>

                  <Button color="inherit">Login</Button>
               </Toolbar>
            </AppBar>
            <Container>
               <Grid container sx={{p: '15px'}}>
                  <AddItemForm addItem={addTodoList} recommendedTitleLength={15} maxTitleLength={20}/>
               </Grid>
               <Grid container spacing={4}>
                  {todoListsComponents}
               </Grid>
            </Container>
         </div>
      </ThemeProvider>
   );
}

export default AppWithReducer;
