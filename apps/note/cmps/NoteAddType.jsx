import { NoteAddTxt } from './NoteAddTxt.jsx'
import { NoteAddTodos } from './NoteAddTodos.jsx'
import { NoteAddImg } from './NoteAddImg.jsx'
import { NoteAddVideo } from './NoteAddVideo.jsx'

export function NoteAddType({ addNote, type }) {
  switch (type.toLowerCase()) {
    case 'notetxt':
      return <NoteAddTxt addNote={addNote} type={type} />

    case 'notetodos':
      return <NoteAddTodos addNote={addNote} type={type} />

    case 'noteimg':
      return <NoteAddImg addNote={addNote} type={type} />

    case 'notevideo':
      return <NoteAddVideo addNote={addNote} type={type} />

    default:
      console.error(`Unsupported note type: ${type}`)
      return null
  }
}
