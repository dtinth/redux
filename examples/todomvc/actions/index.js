import {
  AddTodo,
  DeleteTodo,
  EditTodo,
  CompleteTodo,
  CompleteAll,
  ClearCompleted
} from '../src/Todos.purs'

const action = object => ({ type: 'PERFORM', action: object })

export function addTodo(text) {
  return action(AddTodo.create(text))
}

export function deleteTodo(id) {
  return action(DeleteTodo.create(id))
}

export function editTodo(id, text) {
  return action(EditTodo.create(id)(text))
}

export function completeTodo(id) {
  return action(CompleteTodo.create(id))
}

export function completeAll() {
  return action(CompleteAll.value)
}

export function clearCompleted() {
  return action(ClearCompleted.value)
}
