import { NotePreview } from './NotePreview.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    // if(!notes) return <div>Loading...</div>
	return (
		<ul className="note-list clean-list flex">
			{notes.map((note) => (
            <li key={note.id}>
					<NotePreview note={note} onRemoveNote={onRemoveNote} />
			</li>
                )
			)}
		</ul>
	)
}
