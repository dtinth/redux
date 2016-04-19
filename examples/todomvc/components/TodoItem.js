import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import * as Todos from '../src/Todos.purs'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={Todos.text(todo)}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(Todos.id(todo), text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={Todos.completed(todo)}
                 onChange={() => completeTodo(Todos.id(todo))} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {Todos.text(todo)}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(Todos.id(todo))} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: Todos.completed(todo),
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

export default TodoItem
