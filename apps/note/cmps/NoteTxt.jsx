const { useState } = React

import { PreviewButtons } from './PreviewButtons.jsx'
// import { NoteForm } from './NoteAddTxt.jsx'

export function NoteTxt({
  note,
  deleteNote,
  editNote,
  saveNote,
  from,
  changeBackgroundColor,
}) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: note.info.title,
    txt: note.info.txt,
  })

  const onSubmitHandle = (ev) => {
    ev.preventDefault()
    const updatedNote = { ...note, info: { ...note.info, ...newNoteInfo } }
    saveNote(updatedNote)
  }

  const onChangeHandle = (ev) => {
    const { name, value } = ev.target
    setNewNoteInfo({ ...newNoteInfo, [name]: value })
  }

  const renderTextWithLineBreaks = (text) =>
    text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))

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
          <p>{renderTextWithLineBreaks(note.info.txt)}</p>

          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        </article>
      )

    // case 'noteEdit':
    //   return (
    //     <NoteForm
    //       onSubmit={onSubmitHandle}
    //       onChange={onChangeHandle}
    //       title={newNoteInfo.title}
    //       txt={newNoteInfo.txt}
    //       buttonText="Save"
    //     />
    //   )

    default:
      return null
  }
}
