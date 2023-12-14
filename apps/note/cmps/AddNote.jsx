const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NoteTxt } from '../cmps/NotePreviews/NoteTxt.jsx'
import { AddTxtNote } from './AddNote/AddTxtNote.jsx'
import { AddTitleNote } from './AddNote/AddTitleNote.jsx'
import { AddTodosNote } from './AddNote/AddTodosNote.jsx'
import { AddImageNote } from './AddNote/AddImageNote.jsx'

export function AddNote({ onAddNote }) {
	const empty = noteService.getEmptyNote()
	const emptyInfo = noteService.getEmptyNote().info

	const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
	const [infoToEdit, setInfoToEdit] = useState(
		noteService.getEmptyNote().info
	)
	// const [isExpanded, setExpanded] = useState(false)
	const [type, setType] = useState(noteService.getEmptyNote().type)

	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		if (params.noteId) loadNote()
	}, [params.noteId])

	function loadNote() {
		noteService
			.get(params.noteId)
			.then(setNoteToEdit)
			.catch((err) => console.log('err:', err))
	}

	function handleChange({ target }) {
		// console.log('handleChange  target:', target)
		const field = target.name
		let value = target.value

		switch (target.type) {
			case 'number':
			case 'range':
				value = +value || ''
				break

			case 'checkbox':
				value = target.checked
				break

			default:
				break
		}

		setInfoToEdit((prevInfo) => ({ ...prevInfo, [field]: value }))
		setNoteToEdit((prevNote) => ({ ...prevNote, ['info']: infoToEdit }))
	}

	function onSaveNote(ev) {
		ev.preventDefault()
		console.log('noteToEdit - sent:', noteToEdit)
		onAddNote(noteToEdit)
	}

	function handleExpanded() {
		setExpanded((isExpanded) => !isExpanded)
	}

	return (
		<section className="add-note">
			<section className="txt-container flex column justify-center align-center">
          <h2>Add Text Notes</h2>
				<div className="title-input">
					<AddTitleNote
						noteToEdit={noteToEdit}
						onSaveNote={onSaveNote}
						handleChange={handleChange}
						setType={setType}
					/>
				</div>
				<div className="txt-inpurt">
					<AddTxtNote
						noteToEdit={noteToEdit}
						onSaveNote={onSaveNote}
						handleChange={handleChange}
						setType={setType}
					/>
				</div>
				<div className="notes-actions"></div>
			</section>

			<section className="todos-container flex justify-center align-center column">
        <h2>Add Todos</h2>
				<div className="title-input">
					<AddTitleNote
						noteToEdit={noteToEdit}
						onSaveNote={onSaveNote}
						handleChange={handleChange}
						setType={setType}
					/>
				</div>

				<div className="todos-list flex">
					<div className="todo-input">
						<AddTodosNote
							noteToEdit={noteToEdit}
							onSaveNote={onSaveNote}
							handleChange={handleChange}
							setType={setType}
						/>
					</div>

					<div className="txt-input">
						<AddTxtNote
							noteToEdit={noteToEdit}
							onSaveNote={onSaveNote}
							handleChange={handleChange}
							setType={setType}
						/>
					</div>
				</div>
			</section>

      <section className="image-container flex column justify-center align-center">
        <h2>Add Image Note</h2>
      <div className="title-input">
					<AddTitleNote
						noteToEdit={noteToEdit}
						onSaveNote={onSaveNote}
						handleChange={handleChange}
						setType={setType}
					/>
				</div>

        <div className="image-input">

        <AddImageNote 
        />
        </div>
      </section>

			<section className="add-note">
				<div className="add-note-actions">
					<div className="actions">
						{/* <button className="btn btn-notes-actions btn-bgc-options"><i className="ri-palette-line"></i></button>
        <button className="btn btn-notes-actions btn-add-image"><i className="ri-image-add-line"></i></button>
        <button className="btn btn-notes-actions  btn-archive"><i className="ri-inbox-archive-line"></i></button>
        <button className="btn btn-notes-actions btn-more"><i className="ri-more-2-line"></i></button>
        <button className="btn btn-notes-actions btn-undo"><i className="ri-arrow-go-back-line"></i></button>
        <button className="btn btn-notes-actions btn-redo"><i className="ri-arrow-go-forward-line"></i></button> */}
					</div>
				</div>
			</section>
		</section>
	)
}
