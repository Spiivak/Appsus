const { useState } = React
const { Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote }) {
	console.log('NotePreview  note:', note)

  // const {txt, title} = note
	return (
		<article className="note-preview flex column space-between">
      <h1>{note.info.txt}</h1>
			<button
				className="btn btn-remove-book"
				onClick={() => onRemoveNote(note.id)}
			>
				Remove
			</button>
		</article>
	)
}
