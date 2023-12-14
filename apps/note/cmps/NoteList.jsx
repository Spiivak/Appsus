const { useState, Fragment } = React
import { EditButtons } from './EditButtons.jsx'
import { NotePreview } from './NotePreview.jsx'
import { noteService } from '../services/note.service.js'

export function NoteList({ notes, onChangeNote }) {
  const [noteHoverId, setNoteHoverId] = useState(null)
  const [isColorOpen, setIsColorOpen] = useState(false)

  function handleStyleChange(color, note) {
    const newNote = {
      ...note,
      style: { ...note.style, backgroundColor: color },
    }

    noteService
      .save(newNote)
      .then(onChangeNote)
      .catch((err) => console.log('Error saving note:', err))
  }

  function onPaletteClick(ev) {
    setIsColorOpen((colorOpen) => !colorOpen)
  }

  function onDeleteNote(noteId) {
    noteService
      .remove(noteId)
      .then(onChangeNote)
      .catch((err) => console.log('Error deleting note:', err))
  }

  return (
    <section className="note-list" onClick={() => setIsColorOpen(false)}>
      {notes && notes.length ? (
        notes.map((note) => (
          <article
            className="note-list-item"
            style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}
            onMouseEnter={() => setNoteHoverId(note.id)}
            onMouseLeave={() => setNoteHoverId(null)}
            key={note.id}
          >
            <NotePreview note={note} onChangeNote={onChangeNote} />
            {noteHoverId === note.id && (
              <EditButtons
                note={note}
                handleStyleChange={handleStyleChange}
                isColorOpen={isColorOpen}
                onPaletteClick={onPaletteClick}
                onDeleteNote={onDeleteNote}
              />
            )}
          </article>
        ))
      ) : (
        <h2 className="loading-msg">Loading...</h2>
      )}
    </section>
  )
}
