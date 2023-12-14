import { ColorPicker } from './ColorPicker.jsx'

export function EditButtons({
  onPalletteClick,
  isColorOpen,
  handleStyleChange,
  note,
  onDeleteNote,
}) {
  return (
    <div className="edit-btns" onClick={(ev) => ev.stopPropagation()}>
      <div
        className="edit-btn-container"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="btn-display-container">
        <button className='btn' onClick={onPalletteClick}><i className="ri-palette-line"></i></button>
        </div>
        
        {isColorOpen && (
          <ColorPicker
            pickedColor={note.style.backgroundColor}
            onChangeColor={(color) => handleStyleChange(color, note)}
          />
        )}
      </div>
      {note.id && (
        <div
          className="edit-btn-container"
          onClick={(ev) => ev.stopPropagation()}
        >
          <div
            onClick={() => onDeleteNote(note.id)}
            className="btn-display-container"
          >
            <i className="ri-delete-bin-line" aria-hidden="true"></i>
          </div>
        </div>
      )}
    </div>
  )
}