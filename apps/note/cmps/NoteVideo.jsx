export function NoteVideo({note}) {
  return (
    <article 
    className="note-video"
    style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}
    >
      {note.info.title && <p className="note-title">{note.info.title}</p>}
        <h2 className="note-content">{note.type}</h2>
    </article>
  )
}