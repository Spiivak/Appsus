import { NotesImage } from "./NotePreviews/NotesImage.jsx"
import { NotesTxt } from "./NotePreviews/NotesTxt.jsx"

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
      return <NotesTxt note={note} />
    case 'img':
      return <NotesImage note={note}/>
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

