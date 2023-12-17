const { useState } = React

import { noteService } from '../services/note.service.js'
import { ColorButtons } from './ColorButtons.jsx'

export function NoteAddVideo({ addNote, type }) {
	const [newNoteInfo, setNewNoteInfo] = useState({
		title: '',
		youtubeUrl: '',
	})
	const [backgroundColor, setBackgroundColor] = useState('#fff')
	const [error, setError] = useState('')

	function onSubmitHandle(ev) {
		ev.preventDefault()

		const youtubeUrlRegex =
			/^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?(watch\?v=)?|youtu\.be\/)([^\?&"'>]+)/

		if (!youtubeUrlRegex.test(newNoteInfo.youtubeUrl)) {
			setError('Invalid YouTube Video URL! Please enter a valid URL.')
			return
		}

		let emptyNote = noteService.getEmptyNote()
		emptyNote.info = { ...emptyNote.info, ...newNoteInfo }
		emptyNote.style = { backgroundColor }
		addNote({ ...emptyNote, type })

		setNewNoteInfo({
			title: '',
			youtubeUrl: '',
		})
		setError('')
	}

	function onChangeHandle(ev) {
		const { name, value } = ev.target
		setNewNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, [name]: value }))
	}

	function changeBackgroundColor(colorHex) {
		setBackgroundColor(colorHex)
	}

	return (
		<React.Fragment>
			<form
				className="add-video-form flex column"
				style={{ backgroundColor }}
				onSubmit={onSubmitHandle}
			>
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
				<input
					onChange={onChangeHandle}
					className="videoUrl-input"
					type="text"
					placeholder="YouTube Video URL"
					name="youtubeUrl"
					id="youtubeUrl"
					value={newNoteInfo.youtubeUrl}
				/>

				{error && <div className="error-message">{error}</div>}

				<div className="add-buttons-section">
					<div className="add-buttons flex">
						<button className="note-btn btn" type="submit">
							<i className="fa-solid fa-plus"></i>
						</button>
						<ColorButtons
							changeBackgroundColor={changeBackgroundColor}
						/>
					</div>
				</div>
			</form>
		</React.Fragment>
	)
}
