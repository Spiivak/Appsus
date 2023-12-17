const { useState, useEffect } = React
import { ColorButtons } from './ColorButtons.jsx'

export function NoteEditImg({ selectedNote, setSelectedNote, saveNote }) {
  const { info, style } = selectedNote
  const { title, imgUrl } = info
  const { backgroundColor } = style

  const [newNoteInfo, setNewNoteInfo] = useState({
    title: title || '',
    imgUrl: imgUrl || '',
  })
  const [fileUploaded, setFileUploaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const onSubmitHandle = (ev) => {
    ev.preventDefault()

    if (info.imgUrl === newNoteInfo.imgUrl) {
      saveNote({ selectedNote })
      return
    }

    if (!fileUploaded) {
      // Validate URL or use browser validation
      const url = newNoteInfo.imgUrl.trim()
      if (url && !isValidURL(url)) {
        alert('Invalid Image URL! Please enter a valid URL.')
        return
      }
    }

    let emptyNote = { ...selectedNote }
    emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
    emptyNote.style = { backgroundColor }

    if (newNoteInfo.imgUrl instanceof File) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const dataUrl = e.target.result
        setNewNoteInfo({ ...newNoteInfo, imgUrl: dataUrl })
        emptyNote.info.imgUrl = dataUrl
        saveNote({ ...emptyNote })
      }
      reader.readAsDataURL(newNoteInfo.imgUrl)
      setFileUploaded(true)
    } else {
      saveNote({ ...emptyNote })
    }

    setNewNoteInfo({
      title: '',
      imgUrl: '',
    })
    setFileUploaded(false)
  }

  const onChangeHandle = (ev) => {
    const target = ev.target
    const field = target.name
    const value = target.type === 'file' ? target.files[0] : target.value
    setNewNoteInfo({ ...newNoteInfo, [field]: value })

    if (field === 'imgUrl' && target.type === 'file') {
      setFileUploaded(true)
      const reader = new FileReader()
      reader.onload = function (e) {
        const dataUrl = e.target.result
        document.getElementById('note-img').src = dataUrl
      }
      reader.readAsDataURL(value)
    }
  }

  const changeBackgroundColor = (colorHex) => {
    setBackgroundColor(colorHex)
  }

  return (
    <section
      className="note-edit-prev-wrapper"
      onClick={(ev) => ev.stopPropagation()}
    >
      <form className="note-edit" style={{ backgroundColor }} onSubmit={onSubmitHandle}>
        <input
          className="title-input"
          required
          onChange={onChangeHandle}
          value={newNoteInfo.title}
          type="text"
          placeholder="Title"
          name="title"
          id="title"
        />
        <img
          id="note-img"
          src={newNoteInfo.imgUrl || info.imgUrl}
          alt={newNoteInfo.title || info.title}
        />

        {fileUploaded ? (
          <input
            type="text"
            className="imgUrl-input"
            placeholder="Image URL"
            name="imgUrl"
            id="imgUrl"
            value={'Uploading Img File'}
            disabled
          />
        ) : (
          <React.Fragment>
            <input
              onChange={onChangeHandle}
              type="text"
              className="imgUrl-input"
              placeholder="Image URL"
              name="imgUrl"
              id="imgUrl"
              value={newNoteInfo.imgUrl}
            />
            <input
              onChange={onChangeHandle}
              type="file"
              className="imgUrl-upload"
              accept="image/*"
              name="imgUrl"
              id="imgUrl"
            />
          </React.Fragment>
        )}

        <div className="add-buttons-section justify-center">
            <button className='btn btn-save' type="submit">
              Save
            </button>
            <ColorButtons changeBackgroundColor={changeBackgroundColor} />
        </div>
      </form>
    </section>
  )
}

function isValidURL(url) {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}
