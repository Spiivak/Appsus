import { ColorButtons } from './ColorButtons.jsx'

export function PreviewButtons({
  note,
  deleteNote,
  changeBackgroundColor,
}) {
  function handleDeleteNote() {
    deleteNote(note)
  }

  function handleColorChange(colorHex) {
    changeBackgroundColor(colorHex, note)
  }

  return (
    <section className="preview-btns" onClick={(ev) => ev.stopPropagation()}>
      <button className="note-btn btn delete-btn" onClick={handleDeleteNote}>
      <i className="ri-delete-bin-line"></i>
      </button>

      <ColorButtons changeBackgroundColor={handleColorChange} />
    </section>
  )
}
