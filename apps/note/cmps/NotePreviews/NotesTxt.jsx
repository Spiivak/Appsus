const { useState } = React
const { Link } = ReactRouterDOM

export function NotesTxt({ note }) {
	return (
		<React.Fragment>
			<h1>{note.info.title}</h1>
			<p>{note.info.txt}</p>
		</React.Fragment>
	)
}
