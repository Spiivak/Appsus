
export function NotesImage({ note, file }) {
	return (
		<React.Fragment>
			<h1>{note.info.title}</h1>
			<img src={file}/>
		</React.Fragment>
	)
}
