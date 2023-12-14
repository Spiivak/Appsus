import { NoteImage } from './NoteImage.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'

const { Link } = ReactRouterDOM

export function NotePreview({ note, onChangeNote }) {
  console.log('NotePreview  note:', note)
  return (
    <article onClick={(ev) => ev.stopPropagation()} className="note-preview">
      <Link to={`/note/edit/${note.id}`}>
        <DynamicCmp note={note} onChangeNote={onChangeNote} />
      </Link>
    </article>
  )
}

function DynamicCmp(props) {
  console.log('DynamicCmp  props:', props)
  switch (props.note.type) {
    case 'NoteTxt':
      return <NoteTxt note={props.note} onChangeNote={props.onChangeNote} />
    case 'NoteImg':
      return <NoteImage note={props.note} onChangeNote={props.onChangeNote} />
    case 'NoteVideo':
      return <NoteVideo note={props.note} onChangeNote={props.onChangeNote} />
    case 'NoteTodos':
      return <NoteTodos note={props.note} onChangeNote={props.onChangeNote} />
  }
}