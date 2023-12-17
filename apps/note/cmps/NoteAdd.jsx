const { useState } = React
import { NoteAddType } from './NoteAddType.jsx'

export function NoteAdd({ addNote }) {
  const [selectedType, setSelectedType] = useState(null)
  const [showButtons, setShowButtons] = useState(true)

  const buttonConfigurations = [
    { type: 'noteTxt', title: 'Add Text Note', display: <span>Add a note...</span> },
    { type: 'noteTodos', title: 'Add Todo Note', display: <i className='ri-checkbox-line'></i> },
    { type: 'noteVideo', title: 'Add Video Note', display: <i className='ri-video-add-line'></i> },
    { type: 'noteImg', title: 'Add Image Note', display: <i className='ri-image-add-line'></i> },
  ]

  const onTypeChange = (type) => {
    setSelectedType(type)
    setShowButtons(false)
  }

  const goBack = () => {
    setSelectedType(null)
    setShowButtons(true)
  }

  return (
    <section className="note-add-section">
    <article className="note-add">

      {showButtons && (
        <div className="add-type-btns-notetxt">
          {buttonConfigurations
            .filter((btn) => btn.type === 'noteTxt')
            .map((btn, idx) => (
              <button
                key={idx}
                className={`btn btn-txt-note type-btn ${
                  selectedType === btn.type ? 'active' : ''
                }`}
                onClick={() => onTypeChange(btn.type)}
                title={btn.title}
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
                title={btn.title}
              >
                {btn.display}
              </button>
            ))}
        </div>
      )}

      {selectedType && (
        <div className="controls-container">
          <button className="note-btn" onClick={goBack}>
            Back
          </button>
          <NoteAddType addNote={addNote} type={selectedType} />
        </div>
      )}
    </article>
    </section>
  )
}
