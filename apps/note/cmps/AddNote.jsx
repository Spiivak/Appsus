const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'

export function AddNote({ onAddNote }) {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const {isExpand, setIsExpand} = useState(false)

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
		console.log('handleChange  field:', field)
		let value = target.value
		console.log('handleChange  value:', value)

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

  
    // info: {
    //   url: '',
    //   title,
    //   txt,

		setNoteToEdit(prevNote => ({ ...prevNote.info, [field]: value }))
	}

  function onSaveNote(ev) {
		ev.preventDefault()

    onAddNote(noteToEdit)
	}

  function onSetCollapse() {
    setIsExpand(isExpand => !isExpand)
  }
  
  // const { title, txt } = noteToEdit.info
  console.log('AddNote  noteToEdit:', noteToEdit)

  return (
    <section className="add-note">
      <form onSubmit={onSaveNote}>
      <input
      onChange={handleChange}
      type="text"
      value={noteToEdit.title}
      placeholder="Title"
      name="title"
      id="title"
      />

      <input
      onChange={handleChange}
      type="text"
      value={noteToEdit.txt}
      placeholder="Take a note..."
      name="txt"
      id='txt'
      />
      <button className="btn btn-notes-actions btn-close">Close</button>
      </form>
      <div className="actions">
        {/* <button className="btn btn-notes-actions btn-bgc-options"><i className="ri-palette-line"></i></button>
        <button className="btn btn-notes-actions btn-add-image"><i className="ri-image-add-line"></i></button>
        <button className="btn btn-notes-actions  btn-archive"><i className="ri-inbox-archive-line"></i></button>
        <button className="btn btn-notes-actions btn-more"><i className="ri-more-2-line"></i></button>
        <button className="btn btn-notes-actions btn-undo"><i className="ri-arrow-go-back-line"></i></button>
        <button className="btn btn-notes-actions btn-redo"><i className="ri-arrow-go-forward-line"></i></button> */}
      </div>
    </section>
  )
}