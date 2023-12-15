const { useState } = React

import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { ColorButtonsAdd } from './ColorButtons.jsx'

function TodoItem({ todo, onChange, onRemove, onAddNew, isSingleTodo }) {
	const handleInputChange = (ev) => {
		onChange(ev)
		if (ev.target.value && todo.id === todo.lastId) {
			onAddNew()
		}
	}

	return (
		<div className="todo-wrapper">
			<input
				type="text"
				placeholder="Todo"
				className="todo-input"
				name="txt"
				value={todo.txt}
				onChange={handleInputChange}
			/>
			{!isSingleTodo && (
				<button
					type="button"
					className="todo-remove-btn"
					onClick={onRemove}
				>
					<i className="fa-solid fa-x"></i>
				</button>
			)}
		</div>
	)
}

export function NoteAddTodos({ addNote, type }) {
	const [todos, setTodos] = useState([
		{
			id: utilService.makeId(),
			txt: '',
			isDone: false,
		},
	])

	const [title, setTitle] = useState('')
	const [backgroundColor, setBackgroundColor] = useState('#e9e3d4')

	const onChangeTitleHandle = (ev) => {
		const value = ev.target.value
		setTitle(value)
	}

	const onChangeTodoHandle = (ev, id) => {
		const { name, value } = ev.target
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, [name]: value } : todo
			)
		)
	}

	const addTodo = () => {
		const newTodo = {
			id: utilService.makeId(),
			txt: '',
			isDone: false,
		}
		setTodos((prevTodos) => [...prevTodos, newTodo])
	}

	const removeTodo = (id) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
	}

	const onSubmitHandle = (ev) => {
		ev.preventDefault()
		const emptyNote = noteService.getEmptyNote()
		emptyNote.info = { ...emptyNote.info, title, todos }
		emptyNote.style = { backgroundColor: 'white' }
		addNote({ ...emptyNote, type })
		setTodos([
			{
				id: utilService.makeId(),
				txt: '',
				isDone: false,
			},
		])
		setTitle('')
	}

	const changeBackgroundColor = (colorHex) => {
		setBackgroundColor(colorHex)
	}

	return (
		<React.Fragment>
			<form style={{ backgroundColor }} onSubmit={onSubmitHandle}>
				<input
					required
					className="title-input"
					type="text"
					placeholder="Title"
					name="title"
					id="title"
					value={title}
					onChange={onChangeTitleHandle}
				/>
				{todos.map((todo, index) => (
					<TodoItem
						key={todo.id}
						todo={{ ...todo, lastId: todos[todos.length - 1].id }}
						onChange={(ev) => onChangeTodoHandle(ev, todo.id)}
						onRemove={() => removeTodo(todo.id)}
						onAddNew={addTodo}
						isSingleTodo={todos.length === 1}
					/>
				))}

				<div className="add-buttons-section">
					<section className="add-buttons">
						<button className="btn" type="submit">
							<i className="fa-solid fa-plus"></i>
						</button>
						<ColorButtonsAdd
							changeBackgroundColor={changeBackgroundColor}
						/>
					</section>
				</div>
			</form>
		</React.Fragment>
	)
}
