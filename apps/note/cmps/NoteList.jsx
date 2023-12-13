import { NotePreview } from './NotePreview.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    // if(!notes) return <div>Loading...</div>
	return (
		<ul className="note-list clean-list">
			{notes.map((note) => (
            <li className="note-preview-wrapper" key={note.id}>
					<NotePreview note={note} onRemoveNote={onRemoveNote} />
			</li>
                )
			)}
		</ul>
	)
}

