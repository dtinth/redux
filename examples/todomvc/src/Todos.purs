module Todos where

import Prelude
import Math (max)
import Data.Array (filter)
import Data.Foldable (foldr)

type TodoId = Number

data Todo = Todo {
  text :: String,
  completed :: Boolean,
  id :: TodoId
}

type Todos = Array Todo

data Action
  = AddTodo String
  | DeleteTodo TodoId
  | EditTodo TodoId String
  | CompleteTodo TodoId
  | CompleteAll
  | ClearCompleted

initialState :: Todos
initialState = [ ]

update :: Action -> Todos -> Todos
update (AddTodo text) todos = [ Todo { text: text, completed: false, id: nextId } ] ++ todos
  where
    nextId = maxId + 1.0
    maxId = foldr max (-1.0) (map id todos)
    id (Todo todo) = todo.id

update (DeleteTodo todoId) todos = filter shouldKeep todos
  where
    shouldKeep todo = not (id todo == todoId)

update (EditTodo todoId newText) todos = updateTodoById updateText todoId todos
  where
    updateText (Todo todo) = Todo todo { text = newText }

update (CompleteTodo todoId) todos = updateTodoById updateCompleted todoId todos
  where
    updateCompleted (Todo todo@{ completed: completed }) = Todo todo { completed = not completed }

update CompleteAll todos = map updateCompleted todos
  where
    updateCompleted (Todo todo) = Todo todo { completed = not allCompleted }
    allCompleted = foldr (&&) true (map completed todos)

update ClearCompleted todos = filter (not <<< completed) todos

updateTodoById :: (Todo -> Todo) -> TodoId -> Todos -> Todos
updateTodoById f todoId = map updateTodo
  where
    updateTodo todo
      | id todo == todoId = f todo
      | otherwise         = todo

completed :: Todo -> Boolean
completed (Todo todo) = todo.completed

text :: Todo -> String
text (Todo todo) = todo.text

id :: Todo -> TodoId
id (Todo todo) = todo.id
