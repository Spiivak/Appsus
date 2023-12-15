import { localStorageService } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'noteDB'

let gFilterBy = {
  title: '',
  type: '',
  color: '',
}

const tempNotes = [
  {
    id: 'n101',
    createdAt: 1702080000000,
    type: 'noteTxt',
    isPinned: true,
    style: {
      backgroundColor: `#fff`,
    },
    info: {
      title: 'Title - 1',
      txt: 'lorem ipsum dolor sit amet con laoreet lore tell tellus et lore tell tellus et lore tellus',
    },
  },
  // ... (other temp notes)
]

function query() {
  return storageService.query(NOTES_KEY)
    .then((notes) => {
      return applyFilter(notes);
    });
}

function applyFilter(notes) {
  if (gFilterBy.title) {
    const regex = new RegExp(gFilterBy.title, 'i')
    notes = notes.filter((note) => regex.test(note.info.title))
  }
  if (gFilterBy.type) {
    notes = notes.filter((note) => note.type === gFilterBy.type)
  }
  if (gFilterBy.color) {
    notes = notes.filter((note) => note.style.backgroundColor === gFilterBy.color)
  }
  return notes;
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function save(note) {
  return note.id
    ? storageService.put(NOTES_KEY, note)
    : storageService.post(NOTES_KEY, note);
}

function getFilterBy() {
  return { ...gFilterBy };
}

function setFilterBy(filterBy = {}) {
  gFilterBy = { ...filterBy };
  return getFilterBy();
}

function getEmptyNote(createdAt = Date.now(), type = 'noteTxt', isPinned = false, title = 'New Note') {
  return {
    createdAt,
    type,
    isPinned,
    info: { title },
  };
}

function getNextNoteId(noteId) {
  return storageService.query(NOTES_KEY)
    .then((notes) => {
      let nextNoteIdx = notes.findIndex((note) => note.id === noteId) + 1;
      if (nextNoteIdx === notes.length) nextNoteIdx = 0;
      return notes[nextNoteIdx].id;
    });
}

function initializeNotes() {
  let notes = localStorageService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = tempNotes;
    localStorageService.saveToStorage(NOTES_KEY, notes);
  }
}

initializeNotes();

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getNextNoteId,
  getFilterBy,
  setFilterBy,
};
