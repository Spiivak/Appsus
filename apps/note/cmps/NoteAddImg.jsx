// NoteAddImg.jsx
const { useState } = React
import { noteService } from '../services/note.service.js';
import { ColorButtons } from './ColorButtons.jsx';

function ImageInput({ value, onChange }) {
  return (
    <React.Fragment>
      <input
        onChange={onChange}
        type="text"
        className="imgUrl-input"
        placeholder="Image URL"
        name="imgUrl"
        id="imgUrl"
        value={value}
      />
      <input
        onChange={onChange}
        type="file"
        className="imgUrl-upload"
        accept="image/*"
        name="imgUrl"
        id="imgUrl"
      />
    </React.Fragment>
  );
}

export function NoteAddImg({ addNote, type }) {
  const [newNoteInfo, setNewNoteInfo] = useState({
    title: '',
    imgUrl: '',
  });

  const [backgroundColor, setBackgroundColor] = useState('#fff');

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      setNewNoteInfo({ ...newNoteInfo, imgUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const onSubmitHandle = (ev) => {
    ev.preventDefault();

    if (!newNoteInfo.imgUrl) {
      alert('Please enter a valid Image URL or upload an image file.');
      return;
    }

    const emptyNote = noteService.getEmptyNote();
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo };
    emptyNote.style = { backgroundColor };

    addNote({ ...emptyNote, type });

    setNewNoteInfo({
      title: '',
      imgUrl: '',
    });
  };

  const onChangeHandle = (ev) => {
    const target = ev.target;
    const field = target.name;
    const value = target.type === 'file' ? target.files[0] : target.value;

    setNewNoteInfo({ ...newNoteInfo, [field]: value });

    if (field === 'imgUrl' && target.type === 'file') {
      handleFileChange(value);
    }
  };

  const changeBackgroundColor = (colorHex) => {
    setBackgroundColor(colorHex);
  };

  return (
    <React.Fragment>
      <form className="add-img-form" style={{ backgroundColor }} onSubmit={onSubmitHandle}>
        <input
          required
          className="title-input"
          onChange={onChangeHandle}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          value={newNoteInfo.title}
        />

        {newNoteInfo.imgUrl ? (
          <ImageInput value={newNoteInfo.imgUrl} onChange={onChangeHandle} />
        ) : (
          <ImageInput value={''} onChange={onChangeHandle} />
        )}

        <div className="add-buttons-section">
          <button className="btn" type="submit">
            <i className="fa-solid fa-plus"></i>
          </button>
          <ColorButtons changeBackgroundColor={changeBackgroundColor} />
        </div>
      </form>
    </React.Fragment>
  );
}
