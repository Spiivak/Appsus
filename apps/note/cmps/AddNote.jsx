import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
import { EditButtons } from './EditButtons.jsx'
const { useState, useEffect, useRef, Fragment } = React

export function AddNote({ onAdd, noteToEdit, isOpen, onClose }) {
  const [note, setNote] = useState(noteService.getEmptyNote())
  const [isAddOpen, setIsAddOpen] = useState(isOpen)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const addNoteRef = useRef()

  useEffect(() => {
    window.addEventListener('click', onCloseAdd)

    return () => {
      window.removeEventListener('click', onCloseAdd)
    }
  }, [])

  useEffect(() => {
    if (noteToEdit) {
      setNote(noteToEdit)
    }
  }, [noteToEdit])

  function onOpenAdd() {
    if (!isAddOpen) setIsAddOpen(true)
  }

  function onCloseAdd() {
    if (onClose) {
      onClose()
      return
    }
    setIsAddOpen(false)
    setNote(noteService.getEmptyNote())
  }

  function handleNoteChange({ target }) {
    var field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }

    if (field === 'txt' || field === 'title') {
      handleInfoChange(field, value)
      return
    }

    refactorNote(field, value)
  }

  function refactorNote(field, val) {
    setNote((prevNote) => {
      return { ...prevNote, [field]: val }
    })
  }

  function handleInfoChange(field, value) {
    setNote((prevNote) => {
      const newInfo = { ...prevNote.info, [field]: value }
      return { ...prevNote, info: newInfo }
    })
  }

  function handleStyleChange(val) {
    setNote((prevNote) => {
      return { ...prevNote, style: { ...prevNote.style, backgroundColor: val } }
    })
  }

  function onAddNote(ev) {
    ev.preventDefault()
    noteService.save(note).then((note) => {
      onCloseAdd()
      onAdd()
    })
  }

  function onPalletteClick(ev) {
    setIsColorOpen((colorOpen) => !colorOpen)
  }

  return (
    <section
      style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}
      className="add-note"
    >
      <section ref={addNoteRef} onClick={(ev) => ev.stopPropagation()}>
        <form onSubmit={onAddNote} className="add-note-form">
          {isAddOpen && (
            <Fragment>
							<button  onClick={() => refactorNote('isPinned', !note.isPinned)} className={"btn pin-img " + `${note.isPinned ? 'pinned' : 'unpinned'}`}><i className="ri-pushpin-2-line"></i></button>
              <input
                value={note.info.title}
                onChange={handleNoteChange}
                name="title"
                type="text"
                placeholder="Title"
              />
            </Fragment>
          )}
          <input
            value={note.info.txt}
            onChange={handleNoteChange}
            onClick={onOpenAdd}
            name="txt"
            type="text"
            placeholder="Take a note..."
          />
          {isAddOpen && (
            <div className="tool-bar">
              <EditButtons
                handleStyleChange={handleStyleChange}
                isColorOpen={isColorOpen}
                note={note}
                onPalletteClick={onPalletteClick}
              />
              <button
                className="add-btn"
                disabled={!note.info.txt}
                onClick={onAddNote}
              >
                Add
              </button>
            </div>
          )}
        </form>
      </section>
    </section>
  )
}