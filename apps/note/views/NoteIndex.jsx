const { useState, useEffect } = React
import { AddNote } from "../cmps/AddNote.jsx";
// import { AddNote } from "../cmps/AddNote.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteAsideToolBar } from "../cmps/NoteAsideToolBar.jsx";
import { NoteHeader } from "../cmps/NoteHeader.jsx";


export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => console.log(err))
    }

    function onRemoveNote(noteId) {
        noteService
            .remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId)
                )
            })
            .catch((err) => console.log('err:', err))
    }

    function onAddNote(noteToEdit) {
        console.log('onAddNote  noteToEdit:', noteToEdit)
        noteService
            .save(noteToEdit)
            .then(() => {
                showSuccessMsg(`Note successfully Added! ${noteToEdit.id}`)
                loadNotes()
            })
            .catch((err) => console.log('err:', err))
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <React.Fragment>
                <NoteHeader />
                <NoteAsideToolBar />
                <AddNote onAddNote={onAddNote} />
                <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            </React.Fragment>
        </section>
    )
}
