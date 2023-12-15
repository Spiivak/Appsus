import { noteService } from './note.service.js'

export const noteUtilsService = {
  loadNotes,
  addNote,
  deleteNote,
  editNote,
  saveNote,
  todoToggle,
  changeBackgroundColor,
  setFilterBy,
}

// *  --------------------------//CRUD HANDLE //---------------------------  * //

function loadNotes(setNotes) {
  noteService.setFilterBy({title:'',type:'',color:''})
  noteService
    .query()
    .then((notes) => {
      setNotes(notes)
    })
    .catch((err) => {
      console.error(err)
    })
}

function addNote(note, setNotes) {
  console.log('NoteIndex.addNote', note)
  noteService.save(note).then((note) => {
    setNotes((prevNotes) => [...prevNotes, note])
  })
}

function deleteNote(note, setNotes) {
  const noteId = note.id
  noteService.remove(noteId).then((note) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((prevNote) => prevNote.id !== noteId)
    })
  })
}

function editNote(note, setSelectedNote) {
  setSelectedNote(note)
}

function saveNote(note, setNotes, setSelectedNote) {
  const noteId = note.id
  noteService.save(note).then((updatedNote) => {
    console.log(updatedNote)
    setNotes((prevNotes) => {
      const idx = prevNotes.findIndex((prevNote) => prevNote.id === noteId)
      prevNotes.splice(idx, 1, updatedNote)
      setSelectedNote(null)
      return prevNotes
    })
  })
}

function setFilterBy(title, type, color) {
  console.log({ title, type, color })
  const filterBy = { title, type, color }
  noteService.setFilterBy(filterBy)
  return noteService
    .query()
    .then((notes) => {
      noteService.setFilterBy({})
      return notes
    })
}

//* -------------------------------------------------------------------------- //

function todoToggle(note, todo, setNotes) {
  const noteId = note.id
  const todoId = todo.id

  setNotes((prevNotes) => {
    const noteIndex = prevNotes.findIndex((note) => note.id === noteId)
    const todoIndex = prevNotes[noteIndex].info.todos.findIndex(
      (todo) => todo.id === todoId
    )
    const newNotes = [...prevNotes]

    newNotes[noteIndex].info.todos[todoIndex].isDone =
      !newNotes[noteIndex].info.todos[todoIndex].isDone

    noteService.save(newNotes[noteIndex])
    return newNotes
  })
}

function changeBackgroundColor(colorHex, note, setNotes) {
  const noteId = note.id
  const style = { backgroundColor: colorHex }
  note = { ...note, style }
  console.log(note)
  setNotes((prevNotes) => {
    const noteIndex = prevNotes.findIndex((note) => note.id === noteId)
    prevNotes[noteIndex] = { ...prevNotes[noteIndex], ...note }
    const newNotes = [...prevNotes]
    noteService.save(newNotes[noteIndex])
    return newNotes
  })
}