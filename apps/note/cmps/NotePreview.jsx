const { useState } = React
const { Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote }) {
	// console.log('NotePreview  note:', note)

  // const {txt, title} = note
	return (
		<article className="note-preview">
      {renderNoteContent(note)}
			<button
				className="btn btn-remove-book"
				onClick={() => onRemoveNote(note.id)}
			>
				Remove
			</button>
		</article>
	)
}

function renderNoteContent(note) {
  const { type, info } = note

  switch (type) {
    case 'txt':
      return <NoteTxt />
    case 'img':
      return <NoteImg />
    case 'video':
      return <NoteVideo/>
    case 'todos':
      return (
        <ul>
          {info.todos.map((todo, index) => (
            <li key={index}>
              <input type="checkbox" checked={todo.doneAt} readOnly />
              <span>{todo.txt}</span>
            </li>
          ))}
        </ul>
      )
    // Add cases for other types
    default:
      return null
  }
}

