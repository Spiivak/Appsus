const { useState } = React

import { ColorButtonsAdd } from './ColorButtons.jsx'
import { noteService } from '../services/note.service.js'

const EmptyNote = () => ({
  title: '',
  txt: '',
})

const NoteForm = ({ onSubmit, onChange, value, backgroundColor }) => (
  <form className="add-txt-form" style={{ backgroundColor }} onSubmit={onSubmit}>
    <input
      className="title-input"
      required
      onChange={onChange}
      value={value.title}
      type="text"
      placeholder="Title"
      name="title"
      id="title"
    />

    <textarea
      className="txt-input"
      onChange={onChange}
      value={value.txt}
      rows="4"
      cols="50"
      placeholder="Take a note..."
      name="txt"
      id="txt"
    />

    <div className="add-buttons-section">
        <button className="btn" type="submit">
          <i className="fa-solid fa-plus"></i>
        </button>
        {value.txt && <ColorButtonsAdd />}
    </div>
  </form>
)

export function NoteAddTxt({ addNote, type }) {
  const [noteInfo, setNoteInfo] = useState(EmptyNote)
  const [backgroundColor, setBackgroundColor] = useState('#e9e3d4')

  const onSubmitHandle = (ev) => {
    ev.preventDefault()
    const emptyNote = noteService.getEmptyNote()
    const newNote = { ...emptyNote, info: { ...emptyNote.info, ...noteInfo }, style: { backgroundColor } }
    addNote(newNote)
    setNoteInfo(EmptyNote)
  }

  const onChangeHandle = (ev) => {
    const { name, value } = ev.target
    setNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, [name]: value }))
  }

  const changeBackgroundColor = (colorHex) => {
    setBackgroundColor(colorHex)
  }

  return (
    <NoteForm
      onSubmit={onSubmitHandle}
      onChange={onChangeHandle}
      value={noteInfo}
      backgroundColor={backgroundColor}
    />
  )
}
