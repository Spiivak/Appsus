export function AddTodosNote({handleChange, setType}) {
  setType('todos')
  return (
    <input 
    type="checkbox" 
    name="todos" 
    id="todos" 
    onChange={handleChange}/>
  )
}