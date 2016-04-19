import { initialState, update } from '../src/Todos.purs'

export default function todos(state = initialState, action) {
  if (action.type === 'PERFORM') {
    const nextState = update(action.action)(state)
    return nextState
  } else {
    return state
  }
}
