const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NoteTxt } from './NoteTxt.jsx'

export function AddNote({ onAddNote }) {
  const empty = noteService.getEmptyNote()
  const emptyInfo = noteService.getEmptyNote().info

  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const [infoToEdit, setInfoToEdit] = useState(noteService.getEmptyNote().info)
  // const [isExpanded, setExpanded] = useState(false)
  const [type, setType] = useState(noteService.getEmptyNote().type)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if(params.noteId) loadNote()
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

    setInfoToEdit(prevInfo => ({...prevInfo, [field]: value}))
		setNoteToEdit(prevNote => ({ ...prevNote, ['info']: infoToEdit }))
	}

  function onSaveNote(ev) {
		ev.preventDefault()
    console.log('noteToEdit - sent:', noteToEdit)
    onAddNote(noteToEdit)
	}

  function handleExpanded() {
    setExpanded(isExpanded => !isExpanded)
  }
  
  return (
    <React.Fragment>
      <section>
        <div className="title"></div>
        <div className="add-note"></div>
        <div className="notes-actions"></div>
      </section>




















    <section className="add-note">
      <div className="add-note-actions">
      <NoteTxt noteToEdit={noteToEdit} onSaveNote={onSaveNote} handleChange={handleChange} type={type} setType={setType} />
      <div className="actions">
        <button className="btn btn-notes-actions btn-bgc-options"><i className="ri-palette-line"></i></button>
        <button className="btn btn-notes-actions btn-add-image"><i className="ri-image-add-line"></i></button>
        <button className="btn btn-notes-actions  btn-archive"><i className="ri-inbox-archive-line"></i></button>
        <button className="btn btn-notes-actions btn-more"><i className="ri-more-2-line"></i></button>
        <button className="btn btn-notes-actions btn-undo"><i className="ri-arrow-go-back-line"></i></button>
        <button className="btn btn-notes-actions btn-redo"><i className="ri-arrow-go-forward-line"></i></button>
      </div>
      </div>

    </section>
    </React.Fragment>
  )
}