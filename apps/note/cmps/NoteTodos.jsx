import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteTodos({
  note,
  changeBackgroundColor,
  deleteNote,
  editNote,
  from,
  todoToggle,
}) {
  const isDoneClass = (todo) => (todo.isDone ? 'done' : 'todo')

  const handleTodoClick = (todo) => {
    todoToggle(note, todo)
  }

  return (
    <article className="note-preview" style={note.style}>
      <h2>{note.info.title}</h2>
      {note.info.todos && note.info.todos.length > 0 && (
        <ul>
          {note.info.todos.map((todo) => (
            <li key={todo.id}>
              <span
                onClick={() => handleTodoClick(todo)}
                className={isDoneClass(todo)}>
                {todo.txt}
              </span>
            </li>
          ))}
        </ul>
      )}

      <PreviewButtons
        note={note}
        deleteNote={deleteNote}
        editNote={editNote}
        changeBackgroundColor={changeBackgroundColor}
      />
    </article>
  )
}


// break-inside:avoid;
