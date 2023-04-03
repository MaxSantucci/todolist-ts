import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'


export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   todoListId: string
   title: string
   filter: FilterValuesType
   tasks: Array<TaskType>
   removeTask: (todoListId: string, taskId: string) => void
   changeFilter: (todoListId: string, value: FilterValuesType) => void
   addTask: (todoListId: string, title: string) => void
   changeIsDone: (todoListId: string, id: string, newIsDone: boolean) => void
   removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {
   let [title, setTitle] = useState('')
   let [error, setError] = useState<string | null>('')
   let [buttonName, setButtonName] = useState<FilterValuesType>('all')

   const addTask = () => {
      if (title.trim() !== '') {
         props.addTask(props.todoListId, title.trim());
         setTitle('');
      } else {
         setError('Title is required')
      }
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError('')
      setTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         addTask();
      }
   }

   const onAllClickHandler = () => {
      props.changeFilter(props.todoListId, 'all')
      setButtonName('all')
   };
   const onActiveClickHandler = () => {
      props.changeFilter(props.todoListId, 'active')
      setButtonName('active')
   };
   const onCompletedClickHandler = () => {
      props.changeFilter(props.todoListId, 'completed')
      setButtonName('completed')
   };

   const removeTodoListHandler = () => {
      props.removeTodoList(props.todoListId)
   }

   // const changeIsDoneHandler = (id: string, eventValue: boolean) => {
   //    props.changeIsDone(id, eventValue)
   // }

   return (
      <div>
         <h3>
            {props.title}
            <button onClick={removeTodoListHandler}>x</button>
         </h3>
         <div>
            <input value={title}
                   className={error ? styles.error : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
         </div>
         {error && <div className={styles.errorMessage}>{error}</div>}
         <ul>
            {
               props.tasks.map(t => {
                  const removeTaskHandler = () => props.removeTask(t.id, props.todoListId)
                  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeIsDone(props.todoListId, t.id, event.currentTarget.checked)

                  return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                     <input type="checkbox" checked={t.isDone}
                            onChange={changeTaskStatus}/>
                     <span>{t.title}</span>
                     <button onClick={removeTaskHandler}>x</button>
                  </li>
               })
            }
         </ul>
         <div>
            <button className={buttonName === 'all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={buttonName === 'active' ? styles.activeFilter : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={buttonName === 'completed' ? styles.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
         </div>
      </div>
   )
}
