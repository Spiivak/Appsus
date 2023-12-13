export function AddTitleNote({ handleChange, noteToEdit }) {
  // setType('title')
  return (
    <input
    onChange={handleChange}
    type="text"
    value={noteToEdit.title}
    placeholder="Title"
    name="title"
    id="title"
    />
    
  )
}