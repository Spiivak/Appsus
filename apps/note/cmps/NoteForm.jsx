export function NoteForm({ onSubmit, onChange, title, txt, buttonText }) {
  return (
    <article className="note-preview-edit">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={title}
          placeholder="Title"
          name="title"
          id="title"
        />

        <textarea
          onChange={onChange}
          rows="4"
          cols="50"
          value={txt}
          placeholder="Take a note..."
          name="txt"
          id="txt"
        />
        <button className="btn"  type="submit">{buttonText}</button>
      </form>
    </article>
  )
}
