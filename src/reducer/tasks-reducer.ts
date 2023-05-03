import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";
import {TaskStateType} from '../AppWithReducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangedTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangedTaskActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask = { id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId
                        ? {...m, isDone: action.newIsDone}
                        : m)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId
                        ? {...m, title: action.newTitle}
                        : m)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}

export const changeTaskStatusAC = (taskId: string, newIsDone:boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK',
        taskId,
        newIsDone,
        todolistId
    } as const
}

export const changeTaskTitleAC = (taskId: string, newTitle:string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
       newTitle,
        todolistId
    } as const
}