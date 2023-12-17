import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'

const componentMap = {
  noteTxt: NoteTxt,
  noteImg: NoteImg,
  noteVideo: NoteVideo,
  noteTodos: NoteTodos,
}

export function NotePreview({
  note,
  deleteNote,
  editNote,
  saveNote,
  changeBackgroundColor,
  todoToggle,
  from,
}) {
  
  const NoteComponent = componentMap[note.type]

  if (!NoteComponent) {
    // Handle unknown note types or return a default component
    return null
  }

  return (
    <NoteComponent
      note={note}
      changeBackgroundColor={changeBackgroundColor}
      deleteNote={deleteNote}
      editNote={editNote}
      saveNote={saveNote}
      todoToggle={todoToggle}
      from={from}
    />
  )
}
