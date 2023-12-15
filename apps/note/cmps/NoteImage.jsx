export function NoteImage({note}) {
  console.log('NoteImage  note:', note)
  
  return (
    <article 
    className="note-img"
    style={
      {backgroundColor: note.style.backgroundColor}
    }
    >
      {note.info.title && <p className="note-title">{note.info.title}</p>}
        <img className="note-content" src={note.info.url} />
        {/* <img src="../../../assets/img/gmail-logo.png" alt="" /> */}
    </article>
  )
}