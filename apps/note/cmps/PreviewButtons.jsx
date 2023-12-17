import { ColorButtons } from './ColorButtons.jsx'
const { useNavigate } = ReactRouterDOM

export function PreviewButtons({
  note,
  deleteNote,
  changeBackgroundColor,
  pinNote
}) {
  function handleDeleteNote() {
    deleteNote(note)
  }

  const navigate = useNavigate()

  function handleColorChange(colorHex) {
    changeBackgroundColor(colorHex, note)
  }

  function composeMailBody(note) {
    switch (note.type) {
      case 'noteTxt':
        return note.info.txt
      case 'noteImg':
        return note.info.imgUrl
      case 'noteVideo':
        return note.info.youtubeUrl
      case 'noteTodos':
        if (note.info.todos) {
          return note.info.todos.reduce((acc, todo) => {
            return acc + '\n' + todo.txt
          }, '')
        }
    }
  }
  

  return (
    <section className="preview-btns" onClick={(ev) => ev.stopPropagation()}>
      <button title='Delete Note' className="btn delete-btn" onClick={handleDeleteNote}>
      <i className="ri-delete-bin-line"></i>
      </button>
      <button title={`${ note.isPinned ? 'Unpin' : 'Pin'} Note`} className="btn" onClick={() => {pinNote(note)}}>
        <i className={`ri-${ note.isPinned ? 'unpin-line' : 'pushpin-line'}`}></i>
      </button>
      <button title='Send as mail' className="btn"
        onClick={() => {
          navigate(
            `/mail?subject=${note.info.title}&body=${composeMailBody(note)}`
          )
        }}>
        <i className="ri-send-plane-2-line"></i>
      </button>
      <ColorButtons changeBackgroundColor={handleColorChange} />

    </section>
  )
}
