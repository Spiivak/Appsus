const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteAsideToolBar } from '../cmps/NoteAsideToolBar.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { noteUtilsService } from '../services/note.utils.service.js'

export function NoteIndex() {
	const [notes, setNotes] = useState(null)
	const [selectedNote, setSelectedNote] = useState(null)

	useEffect(() => {
		loadNotes()
	}, [])

	// *  --------------------------//CRUD HANDLE //---------------------------  * //

	function loadNotes() {
		noteUtilsService.loadNotes(setNotes)
	}

	function addNote(note) {
		noteUtilsService.addNote(note, setNotes)
	}

	function deleteNote(note) {
		noteUtilsService.deleteNote(note, setNotes)
	}

	function editNote(note) {
		noteUtilsService.editNote(note, setSelectedNote)
	}

	function saveNote(note) {
		noteUtilsService.saveNote(note, setNotes, setSelectedNote)
	}

	//* -------------------------------------------------------------------------- //

	function todoToggle(note, todo) {
    noteUtilsService.todoToggle(note, todo, setNotes)
	}

	function changeBackgroundColor(colorHex, note) {
		if (note && note.id) noteUtilsService.changeBackgroundColor(colorHex, note, setNotes)
    else console.error("invalid note object: " + note)

	}

	if (!notes) return <div>Loading... </div>
	return (
		<section className="note-index">
			<NoteHeader />

			<section className="main-note-container">
			<NoteAsideToolBar />
				<section className="note-add-container">
					<NoteAdd addNote={addNote} />
				</section>
				<NoteList
					notes={notes}
					changeBackgroundColor={changeBackgroundColor}
					deleteNote={deleteNote}
					editNote={editNote}
					todoToggle={todoToggle}
				/>
			</section>

			{selectedNote && (
				<NoteEdit
					selectedNote={selectedNote}
					setSelectedNote={setSelectedNote}
					saveNote={saveNote}
				/>
			)}
		</section>
	)
}
