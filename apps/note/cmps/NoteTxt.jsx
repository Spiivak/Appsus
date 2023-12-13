export function NoteTxt({ noteToEdit, onSaveNote, handleChange, type, setType }) {
  setType('txt')
  return (
    <form onSubmit={onSaveNote}>
    <input
    onChange={handleChange}
    type="text"
    value={noteToEdit.title}
    placeholder="Title"
    name="title"
    id="title"
    />

    <textarea
    onChange={handleChange}
    type="text"
    value={noteToEdit.txt}
    placeholder="Take a note..."
    name="txt"
    id='txt'
    />
    <button className="btn btn-notes-actions btn-close">Close</button>
    </form>
  )
}