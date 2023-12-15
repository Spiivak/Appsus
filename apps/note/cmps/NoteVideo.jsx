import { PreviewButtons } from './PreviewButtons.jsx'

export function NoteVideo({
  note,
  changeBackgroundColor,
  deleteNote,
  editNote,
  from,
}) {
  function extractYouTubeVideoId(url) {
    const match = url.match(/[?&]v=([^?&]+)/)
    return match ? match[1] : null
  }

  function generateYouTubeEmbedUrl(url) {
    const videoId = extractYouTubeVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  switch (from) {
    case 'noteList':
      const embedUrl = generateYouTubeEmbedUrl(note.info.youtubeUrl)

      return (
        <article
          onClick={() => {
            editNote(note)
          }}
          className="note-preview"
          style={note.style}
        >
          <h2>{note.info.title}</h2>
          {embedUrl && (
            <iframe
              width="200"
              height="150"
              src={embedUrl}
              title={note.info.title}
              allowFullScreen
            ></iframe>
          )}

          <PreviewButtons
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
            changeBackgroundColor={changeBackgroundColor}
          />
        </article>
      )

    case 'noteEdit':
    default:
      return null
  }
}
