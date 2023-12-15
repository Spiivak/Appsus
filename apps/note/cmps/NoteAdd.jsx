const { useState } = React;
import { NoteAddType } from './NoteAddType.jsx';

export function NoteAdd({ addNote }) {
  const [selectedType, setSelectedType] = useState('noteTxt');

  const buttonConfigurations = [
    { type: 'noteTxt', icon: 'fa-solid fa-pencil' },
    { type: 'noteTodos', icon: 'fa-regular fa-file' },
    { type: 'noteImg', icon: 'fa-solid fa-camera' },
    { type: 'noteVideo', icon: 'fa-solid fa-video' },
  ];

  const onTypeChange = (type) => {
    setSelectedType(type);
  };

  const isActiveClass = (type) => (selectedType === type ? 'active' : '');

  return (
    <article className="note-add">
      <div className="add-type-btns">
        {buttonConfigurations.map((btn, idx) => (
          <button
            key={idx}
            className={`btn type-btn ${isActiveClass(btn.type)}`}
            onClick={() => onTypeChange(btn.type)}>
            <i className={`fa ${btn.icon}`}></i>
          </button>
        ))}
      </div>
      {selectedType && <NoteAddType addNote={addNote} type={selectedType} />}
    </article>
  );
}
