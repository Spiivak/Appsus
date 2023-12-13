const { useState, useEffect } = React


export function AddNote() {
  const {isExpand, setIsExpand} = useState(false)

  function onSetCollapse() {
    setIsExpand(isExpand => !isExpand)
  }

  return (
    <section className="add-note">
      <input type="text" placeholder="Title" />
      <input type="text" placeholder="Take a note..."/>
      <div className="actions">
        <button className="btn btn-notes-actions btn-bgc-options"><i className="ri-palette-line"></i></button>
        <button className="btn btn-notes-actions btn-add-image"><i className="ri-image-add-line"></i></button>
        <button className="btn btn-notes-actions  btn-archive"><i className="ri-inbox-archive-line"></i></button>
        <button className="btn btn-notes-actions btn-more"><i className="ri-more-2-line"></i></button>
        <button className="btn btn-notes-actions btn-undo"><i className="ri-arrow-go-back-line"></i></button>
        <button className="btn btn-notes-actions btn-redo"><i className="ri-arrow-go-forward-line"></i></button>
        <button className="btn btn-notes-actions btn-close">Close</button>
      </div>
    </section>
  )
}