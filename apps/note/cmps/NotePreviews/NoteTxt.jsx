const { useState } = React
const { Link } = ReactRouterDOM

export function NoteTxt({ note, onRemoveNote }) {
	return (
		<React.Fragment>
			<h1>{info.title}</h1>
			<p>{info.txt}</p>
		</React.Fragment>
	)
}

function renderNoteContent(note) {
	const { type, info } = note

	switch (type) {
		case 'txt':
			return (
				<React.Fragment>
					<h1>{info.title}</h1>
					<p>{info.txt}</p>
				</React.Fragment>
			)
		case 'img':
			return <img src={info.url} alt={info.title} />
		case 'video':
			return (
				<iframe
					width="300"
					height="200"
					src={info.url}
					title={info.title}
				/>
			)
		case 'todos':
			return (
				<ul>
					{info.todos.map((todo, index) => (
						<li key={index}>
							<input
								type="checkbox"
								checked={todo.doneAt}
								readOnly
							/>
							<span>{todo.txt}</span>
						</li>
					))}
				</ul>
			)
		// Add cases for other types
		default:
			return null
	}
}
