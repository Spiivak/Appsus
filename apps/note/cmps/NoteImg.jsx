import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteImg({ note, changeBackgroundColor, deleteNote, editNote, from }) {
  switch (from) {
    case 'noteList':
      return (
        <article
          onClick={() => {
            editNote(note)
          }}
          className="note-preview"
          style={note.style}
        >
          <h2>{note.info.title}</h2>
          <img src={note.info.imgUrl} alt={note.info.title} />

          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        </article>
      )

    case 'noteEdit':
      // Render something specific for the 'noteEdit' case
      // For example, you might want to show an editable version of the image
      return (
        <div className="note-edit">
          <h2>{note.info.title}</h2>
          <img src={note.info.imgUrl} alt={note.info.title} />

          {/* You might want to add editing controls here */}
        </div>
      )

    default:
      return null // Handle other cases or return null if not applicable
  }
}
