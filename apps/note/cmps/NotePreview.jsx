import { NoteImage } from './NoteImage.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'

const { Link } = ReactRouterDOM

export function NotePreview({ note, onChangeNote }) {
  // console.log('note', note)
  return (
    <article onClick={(ev) => ev.stopPropagation()} className="note-preview">
      <Link to={`/notes/edit/${note.id}`}>
        <DynamicCmp note={note} onChangeNote={onChangeNote} />
      </Link>
    </article>
  )
}

// console.log('note:', note)
function DynamicCmp({ note, onChangeNote}) {
  switch (note.type) {
    case 'NoteTxt':
      return <NoteTxt note={note} onChangeNote={onChangeNote} />
    case 'NoteImg':
      return <NoteImage note={note} onChangeNote={onChangeNote} />
    case 'NoteVideo':
      return <NoteVideo note={note} onChangeNote={onChangeNote} />
    case 'NoteTodos':
      return <NoteTodos note={note} onChangeNote={onChangeNote} />
    default:
      throw new Error(`Unsupported note type: ${note.type}`);
  }
}