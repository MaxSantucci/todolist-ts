// import React, {ChangeEvent, FC} from 'react';
// import AddItemForm from './AddItemForm';
// import EditableSpan from './EditableSpan';
// import {Button, Checkbox, IconButton, List, ListItem, Typography} from '@mui/material';
// import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
// import {TodoListType} from './AppWithRedux';
//
// type PropsType = {
//    todoList: TodoListType
// }
//
// export type TaskType = {
//    id: string
//    title: string
//    isDone: boolean
// }
//
// function DeleteForeverIcon() {
//    return null;
// }
//
// const TodoList: FC<TodoListPropsType> = ({todoList}) => {
//
//    const {id, title, filter} = todoList
//
//    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
//       const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
//       const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
//       const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(task.id, newTitle, props.todoListId)
//       return (
//          <ListItem
//             key={task.id}
//             disablePadding
//             secondaryAction={<IconButton
//                size="small"
//                onClick={removeTaskHandler}
//             >
//                <DeleteSweepIcon/>
//             </IconButton>}
//          >
//             <Checkbox
//                edge="start"
//                color="secondary"
//                size="small"
//                onChange={changeTaskStatus}
//                checked={task.isDone}
//             />
//             <EditableSpan
//                title={task.title}
//                changeTitle={changeTaskTitle}
//                classes={task.isDone ? 'task-done' : 'task'}
//             />
//          </ListItem>
//       )
//    })
//
//    const addTask = (title: string) => props.addTask(title, props.todoListId)
//    const removeTodoList = () => props.removeTodoList(props.todoListId)
//    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.todoListId)
//    return (
//       <div className={todoClasses}>
//          <Typography
//             variant={'h5'}
//             align={'center'}
//             fontWeight={'bold'}
//          >
//             <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
//             <Button
//                size={'small'}
//                variant={'contained'}
//                onClick={removeTodoList}
//                sx={{ml: '15px'}}
//             >
//                x
//             </Button>
//          </Typography>
//          <AddItemForm
//             addItem={addTask}
//             recommendedTitleLength={15}
//             maxTitleLength={20}
//          />
//          <List>
//             {todoListItems}
//          </List>
//          <div className={'btn-filter-container'}>
//             <Button
//                size={'small'}
//                variant={'contained'}
//                disableElevation
//                color={props.filter === 'all' ? 'secondary' : 'primary'}
//                onClick={() => {
//                   props.changeTodoListFilter('all', props.todoListId)
//                }}
//             >All
//             </Button>
//             <Button
//                size={'small'}
//                variant={'contained'}
//                disableElevation
//                color={props.filter === 'active' ? 'secondary' : 'primary'}
//                onClick={() => {
//                   props.changeTodoListFilter('active', props.todoListId)
//                }}
//             >Active
//             </Button>
//             <Button
//                size={'small'}
//                variant={'contained'}
//                disableElevation
//                color={props.filter === 'completed' ? 'secondary' : 'primary'}
//                onClick={() => {
//                   props.changeTodoListFilter('completed', props.todoListId)
//                }}
//             >Completed
//             </Button>
//          </div>
//       </div>
//    );
// };
//
// export default TodoList;

export const a = 1