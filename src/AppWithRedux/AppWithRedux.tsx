import React from 'react'
import '../App.css';
import {TaskType, Todolist} from '../Todolist';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {AppBar, Box, Container, Grid, Paper, Toolbar, Typography} from '@mui/material';

import {useAppWithRedux} from './hooks/useAppWithRedux';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}

export type TasksStateType = {
   [key: string]: Array<TaskType>
}

/*
const Fake = React.memo(function() {
    console.log("FAKE")
    const arr = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks.count)
    return <h1>{arr.length}</h1>
})
*/

function AppWithRedux() {
   const {todolists, tasks, removeTask, addTask, changeStatus, changeTaskTitle, changeFilter, removeTodolist, changeTodolistTitle, addTodolist} = useAppWithRedux()

   return (
      <div className="App">
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
               <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                     To-do list
                  </Typography>
               </Toolbar>
            </AppBar>
         </Box>
         <Container fixed>
            <Grid container style={{padding: "20px"}}>
               <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
               {
                  todolists.map(tl => {
                     return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                           <Todolist
                              id={tl.id}
                              title={tl.title}
                              tasks={tasks[tl.id]}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                           />
                        </Paper>
                     </Grid>
                  })
               }
            </Grid>
         </Container>
      </div>
   );
}

export default AppWithRedux;
