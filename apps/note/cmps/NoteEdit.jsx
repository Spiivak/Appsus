import { NoteEditImg } from './NoteEditImg.jsx'
import { NoteEditTodos } from './NoteEditTodos.jsx'
import { NoteEditTxt } from './NoteEditTxt.jsx'
import { NoteEditVideo } from './NoteEditVideo.jsx'

export function NoteEdit({ selectedNote, setSelectedNote, saveNote }) {
  const lowerCaseType = selectedNote.type.toLowerCase()

  switch (lowerCaseType) {
    case 'notetxt':
      return (
        <NoteEditTxt
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )

    case 'noteimg':
      return (
        <NoteEditImg
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )

    case 'notevideo':
      return (
        <NoteEditVideo
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )

    case 'notetodos':
      return (
        <NoteEditTodos
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          saveNote={saveNote}
        />
      )

    default:
      console.error(`Unsupported note type: ${selectedNote.type}`)
      return null
  }
}