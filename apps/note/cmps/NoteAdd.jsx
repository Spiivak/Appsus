const { useState } = React;
import { NoteAddType } from './NoteAddType.jsx';

export function NoteAdd({ addNote }) {
  const [selectedType, setSelectedType] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const buttonConfigurations = [
    { type: 'noteTxt', display: <span>Add a note...</span> },
    { type: 'noteTodos', display: <i className='ri-checkbox-line'></i> },
    { type: 'noteImg', display: <i className='ri-video-add-line'></i> },
    { type: 'noteVideo', display: <i className='ri-image-add-line'></i> },
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
      {/* Render 'noteTxt' type separately */}
      {showButtons && (
        <div className="add-type-btns-notetxt">
          {buttonConfigurations
            .filter((btn) => btn.type === 'noteTxt')
            .map((btn, idx) => (
              <button
                key={idx}
                className={`btn type-btn ${
                  selectedType === btn.type ? 'active' : ''
                }`}
                onClick={() => onTypeChange(btn.type)}
              >
                {btn.display}
              </button>
            ))}
        </div>
      )}

      {/* Render other types */}
      {showButtons && (
        <div className="add-type-btns">
          {buttonConfigurations
            .filter((btn) => btn.type !== 'noteTxt')
            .map((btn, idx) => (
              <button
                key={idx}
                className={`btn type-btn ${
                  selectedType === btn.type ? 'active' : ''
                }`}
                onClick={() => onTypeChange(btn.type)}
              >
                {btn.display}
              </button>
            ))}
        </div>
      )}

      {selectedType && (
        <div className="controls-container">
          <button className="btn" onClick={goBack}>
            Back
          </button>
          <NoteAddType addNote={addNote} type={selectedType} />
        </div>
      )}
    </article>
  );
}
