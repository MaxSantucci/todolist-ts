import React, {useState} from 'react';
import './App.css';
import AddItemForm from './AddItemForm';
import {
   AppBar,
   Button,
   Checkbox,
   Container,
   createTheme,
   CssBaseline,
   FormControlLabel,
   FormGroup,
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
   RemoveTodoListAC
} from './reducer/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducer/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './reducer/store';

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

function AppWithRedux(): JSX.Element {
   // BLL:
   let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
   let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
   const dispatch = useDispatch()

   const [isDarkMode, setDarkMode] = useState<boolean>(true)

   const removeTask = (taskId: string, todoListId: string) => {
      const action = removeTaskAC(taskId, todoListId)
      dispatch(action)
   }
   const addTask = (title: string, todoListId: string) => {
      const action = addTaskAC(title, todoListId)
      dispatch(action)
   }
   const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
      const action = changeTaskStatusAC(taskId, newIsDone, todoListId)
      dispatch(action)
   }
   const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
      const action = changeTaskTitleAC(taskId, newTitle, todoListId)
      dispatch(action)
   }
   const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
      const action = ChangeTodoListFilterAC(filter, todoListId)
      dispatch(action)
   }
   const removeTodoList = (todoListId: string) => {
      const action = RemoveTodoListAC(todoListId)
      dispatch(action)
   }
   const changeTodoListTitle = (newTitle: string, todoListId: string) => {
      const action = ChangeTodoListTitleAC(newTitle, todoListId)
      dispatch(action)
   }
   const addTodoList = (title: string) => {
      const action = AddTodoListAC(title)
      dispatch(action)
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

   const mode = isDarkMode ? 'dark' : 'light'
   const customTheme = createTheme({
      palette: {
         primary: amber,
         secondary: lightGreen,
         mode: mode
      }
   })

   return (
      <ThemeProvider theme={customTheme}>
         <CssBaseline/>
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
                           onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}
                        label={isDarkMode ? 'Light mode' : 'Dark mode'}
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

export default AppWithRedux;
