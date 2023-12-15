const { useState } = React

import { noteService } from '../services/note.service.js'
import { ColorButtonsAdd } from './ColorButtons.jsx'

export function NoteAddVideo({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    youtubeUrl: '', // New property for YouTube video URL
  })
  const [backgroundColor, setBackgroundColor] = useState('#e9e3d4')
  const [error, setError] = useState('')

  function onSubmitHandle(ev) {
    ev.preventDefault()

    // Updated regex to accept various YouTube video URL formats
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?(watch\?v=)?|youtu\.be\/)([^\?&"'>]+)/

    if (!youtubeUrlRegex.test(newNoteInfo.youtubeUrl)) {
      setError('Invalid YouTube Video URL! Please enter a valid URL.')
      return
    }

    let emptyNote = noteService.getEmptyNote()
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }
    addNote({ ...emptyNote, type })

    setNewNoteInfo({
      title: '',
      youtubeUrl: '', // Clear YouTube video URL after submission
    })
    setError('')
  }

  function onChangeHandle(ev) {
    const { name, value } = ev.target
    setNewNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, [name]: value }))
  }

  function changeBackgroundColor(colorHex) {
    setBackgroundColor(colorHex)
  }

  return (
    <React.Fragment>
      <form style={{ backgroundColor }} onSubmit={onSubmitHandle}>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          required
          className="title-input"
          onChange={onChangeHandle}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          value={newNoteInfo.title}
        />

        <label htmlFor="youtubeUrl" className="label">
          YouTube Video URL
        </label>
        <input
          onChange={onChangeHandle}
          className="videoUrl-input"
          type="text"
          placeholder="YouTube Video URL"
          name="youtubeUrl"
          id="youtubeUrl"
          value={newNoteInfo.youtubeUrl}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="add-buttons-section">
            <button className="btn" type="submit">
              <i className="fa-solid fa-plus"></i>
            </button>
            <ColorButtonsAdd changeBackgroundColor={changeBackgroundColor} />
        </div>
      </form>
    </React.Fragment>
  )
}