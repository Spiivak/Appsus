import { NotesImage } from "../NotePreviews/NotesImage.jsx"

const { useState } = React

export function AddImageNote() {
  const [file, setFile ] = useState()
  function handleChange(e) {
    console.log(e.target.files)
    setFile(URL.createObjectURL(e.target.files[0]))
    {<NotesImage file={file}/>}
  }
  return (
      <input type="file" id="add-image-note" name="image" accept="image/png image/jpeg"/>
  )
}