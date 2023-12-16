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
    <section className="btn preview-btns" onClick={(ev) => ev.stopPropagation()}>
      <button className="btn delete-btn" onClick={handleDeleteNote}>
        x
      </button>

      <ColorButtons changeBackgroundColor={handleColorChange} />
    </section>
  )
}
