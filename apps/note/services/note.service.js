// note service

import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';
import { localStorageService } from '../../../services/storage.service.js';

const NOTE_KEY = 'notesDB'

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter
}

function query() {
  return storageService.query(NOTE_KEY)
    // .then(notes => notes)
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if(note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getDefaultFilter() {
  return { pinned: '' }
}

function getEmptyNote(title = '', txt = '') {
  return {
    createAt: '',
    type: 'txt',
    isPinned: '',
    style: {
      backgroundColor: '#00d'
    },
    info: {
      url: '',
      title,
      txt,
      todos: [
        {
          txt: '',
          doneAt: '',
        }
      ],
    }
  }
}

function _createNotes() {
  let notes = localStorageService.loadFromStorage(NOTE_KEY)
  if(!notes || !notes.length) {

    const notes = [
      {
        id: utilService.makeId(),
        createAt: '',
        type: 'txt',
        isPinned: '',
        style: {
          backgroundColor: '#00d'
        },
        info: {
          url: '',
          title: 'Home',
          txt: 'Take a walk.',
          todos: [
            {
              txt: '',
              doneAt: '',
            }
          ],
        }
      },
      {
        id: utilService.makeId(),
        createAt: '',
        type: 'txt',
        isPinned: '',
        style: {
          backgroundColor: '#00d'
        },
        info: {
          url: '',
          title: 'Home',
          txt: 'Take a walk.',
          todos: [
            {
              txt: '',
              doneAt: '',
            }
          ],
        }
      },
      {
        id: utilService.makeId(),
        createAt: '',
        type: 'txt',
        isPinned: '',
        style: {
          backgroundColor: '#00d'
        },
        info: {
          url: '',
          title: 'Home',
          txt: 'Take a walk.',
          todos: [
            {
              txt: '',
              doneAt: '',
            }
          ],
        }
      },
      {
        id: utilService.makeId(),
        createAt: '',
        type: 'txt',
        isPinned: '',
        style: {
          backgroundColor: '#00d'
        },
        info: {
          url: '',
          title: 'Home',
          txt: 'Take a walk.',
          todos: [
            {
              txt: '',
              doneAt: '',
            }
          ],
        }
      },
      {
        id: utilService.makeId(),
        createAt: '',
        type: 'txt',
        isPinned: '',
        style: {
          backgroundColor: '#00d'
        },
        info: {
          url: '',
          title: 'Home',
          txt: 'Take a walk.',
          todos: [
            {
              txt: '',
              doneAt: '',
            }
          ],
        }
      },
      
    ]
        localStorageService.saveToStorage(NOTE_KEY, notes)
  }
}

function _createNote({ id, title, txt }) {
  const note = getEmptyNote({ id, title, txt})
  console.log('Create Note', note)
  return note
}