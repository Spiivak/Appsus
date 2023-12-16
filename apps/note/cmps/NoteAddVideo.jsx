const { useState } = React

import { noteService } from '../services/note.service.js'
import { ColorButtons } from './ColorButtons.jsx'

export function NoteAddVideo({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    youtubeUrl: '',
  })
  const [backgroundColor, setBackgroundColor] = useState('#fff')
  const [error, setError] = useState('')

  function onSubmitHandle(ev) {
    ev.preventDefault()

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
      youtubeUrl: '',
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
      <form className="add-video-form" style={{ backgroundColor }} onSubmit={onSubmitHandle}>
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
          <ColorButtons changeBackgroundColor={changeBackgroundColor} />
        </div>
      </form>
    </React.Fragment>
  );
}
