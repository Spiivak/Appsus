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
		// <section className="add-notes flex justify-center">
		// 	<section>
		// 		<div className="add-notes flex">
		// 			<div className="txt-note" onClick={() => <AddTxtNote/>}>
		// 			<p>Write a note...</p>
		// 			</div>
		// 			<button onClick={() => <AddTodosNote />}><i className="ri-checkbox-line"></i></button>
		// 			<button onClick={() => <AddCanvasNote />}><i className="ri-brush-line"></i></button>
		// 			<button onClick={() => <AddImageNote />}><i className="ri-image-add-line"></i></button>
		// 		</div>
		// 	</section>

		<section className="add-note-container flex justify-center">
			<section className="txt-container flex column justify-center align-center">
				<h2>Add Text Notes</h2>
				<form onSubmit={onSaveNote} className="main-input flex justify-center align-center column">
					<div className="title-section">

					<AddTitleNote
						noteToEdit={noteToEdit}
						onSaveNote={onSaveNote}
						handleChange={handleChange}
						setType={setType}
						/>
						<button className='btn'><i class="ri-pushpin-2-line"></i></button>
						</div>
					<AddTxtNote
						noteToEdit={noteToEdit}
						onSaveNote={onSaveNote}
						handleChange={handleChange}
						setType={setType}
					/>
				<div className="notes-actions flex space-between align-center">
					<div className="actions">
					<button title="Background Options" className="btn"><i className="ri-palette-line"></i></button>
					<button title="Add Image" className="btn"><i className="ri-image-add-line"></i></button>
					<button title="Arvhice" className="btn"><i className="ri-inbox-archive-line"></i></button>
					<button title="More" className="btn"><i className="ri-more-2-fill"></i></button>
					<button title="Undo" className="btn"><i className="ri-arrow-go-back-line"></i></button>
					<button title="Redo" className="btn"><i className="ri-arrow-go-forward-line"></i></button>
					</div>
					<div className="submit-btn">
					<button className="btn">Submit</button>
					</div>
				</div>
				</form>
			</section>

			{/* 

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
      </section> */}
		</section>
		// </section>
	)
}
