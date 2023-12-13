

export function AddTxtNote({ handleChange, noteToEdit, setType }){
  setType('txt')
  return (
  <input
    onChange={handleChange}
    type="text"
    value={noteToEdit.txt}
    placeholder="Take a note..."
    name="txt"
    id='txt'
    />
    )
}