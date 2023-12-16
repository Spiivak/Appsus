const { useState } = React;
import { NoteAddType } from './NoteAddType.jsx';

export function NoteAdd({ addNote }) {
  const [selectedType, setSelectedType] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const buttonConfigurations = [
    { type: 'noteTxt', icon: 'ri-text' },
    { type: 'noteTodos', icon: 'ri-checkbox-line' },
    { type: 'noteImg', icon: 'ri-video-add-line' },
    { type: 'noteVideo', icon: 'ri-image-add-line' },
  ];

  const onTypeChange = (type) => {
    setSelectedType(type);
    setShowButtons(false);
  };

  const goBack = () => {
    setSelectedType(null);
    setShowButtons(true);
  };

  return (
    <article className="note-add">
      {showButtons && (
        <div className="add-type-btns">
          {buttonConfigurations.map((btn, idx) => (
            <button
              key={idx}
              className={`btn type-btn ${
                selectedType === btn.type ? 'active' : ''
              }`}
              onClick={() => onTypeChange(btn.type)}
            >
              <i className={`fa ${btn.icon}`}></i>
            </button>
          ))}
        </div>
      )}
      {selectedType && (
        <div>
          <button className="btn" onClick={goBack}>
            Back
          </button>
          <NoteAddType addNote={addNote} type={selectedType} />
        </div>
      )}
    </article>
  );
}
