import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../AppWithRedux';


export type RemoveTodoListAT = {
   type: 'REMOVE-TODOLIST'
   id: string
}

export type AddTodoListAT = {
   type: 'ADD-TODOLIST'
   title: string
   todolistId: string
}

export type ChangeTodoListTitleAT = {
   type: 'CHANGE-TODOLIST'
   title: string
   id: string
}

export type ChangeTodoListFilterAT = {
   type: 'CHANGE-TODOLIST-FILTER'
   id: string
   filter: FilterValuesType
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: TodoListType[] = []

export const todolistReducer = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(t => t.id !== action.id)
      case 'ADD-TODOLIST':
         const newTodo: TodoListType = { id: action.todolistId, title: action.title, filter: 'all'}
         return [...state, newTodo]
      case 'CHANGE-TODOLIST':
         return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
      default:
         return state
   }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
   return {
      type: 'REMOVE-TODOLIST',
      id: id,
   } as const
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
   return {
      type: 'ADD-TODOLIST',
      title: title,
      todolistId: v1()
   } as const
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
   return {
      type: 'CHANGE-TODOLIST',
      id: id,
      title: title
   }
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string, ): ChangeTodoListFilterAT => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',
      filter: filter,
      id: id,
   }
}