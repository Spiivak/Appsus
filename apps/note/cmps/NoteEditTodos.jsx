// noteedittodos.jsx

const { useState, useEffect } = React;

export function NoteEditTodos({ selectedNote, setSelectedNote, saveNote }) {
  const [currNote, setCurrNote] = useState(selectedNote);
  const [newTodoInfo, setNewTodoInfo] = useState({
    todos: currNote.todos || [],
  });
  const [backgroundColor, setBackgroundColor] = useState(
    currNote.style.backgroundColor
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  function onSubmitHandle(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let emptyNote = currNote;
    emptyNote.todos = newTodoInfo.todos;
    emptyNote.style = { backgroundColor };
    saveNote(emptyNote);
  }

  function onChangeHandle(ev) {
    const target = ev.target;
    const field = target.name;
    const value = target.value;

    setNewTodoInfo({ ...newTodoInfo, [field]: value });
  }

  function changeBackgroundColor(colorHex) {
    setBackgroundColor(colorHex);
  }

  function addTodo() {
    setNewTodoInfo({
      ...newTodoInfo,
      todos: [...newTodoInfo.todos, { text: '', completed: false }],
    });
  }

  function updateTodo(index, field, value) {
    const updatedTodos = [...newTodoInfo.todos];
    updatedTodos[index] = { ...updatedTodos[index], [field]: value };
    setNewTodoInfo({ ...newTodoInfo, todos: updatedTodos });
  }

  function removeTodo(index) {
    const updatedTodos = [...newTodoInfo.todos];
    updatedTodos.splice(index, 1);
    setNewTodoInfo({ ...newTodoInfo, todos: updatedTodos });
  }

  return (
    <section className="note-edit-prev-wrapper" onClick={onSubmitHandle}>
      <form
        className="note-edit"
        onClick={(ev) => ev.stopPropagation()}
        style={{ backgroundColor }}
        onSubmit={onSubmitHandle}
      >
        {/* Add your title input here if needed */}
        <div className="add-buttons-section">
          <button className="note-btn" type="submit">
            Save
          </button>
          <ColorButtons changeBackgroundColor={changeBackgroundColor} />
          <button className="note-btn" type="button" onClick={addTodo}>
            Add Todo
          </button>
        </div>
        {newTodoInfo.todos.map((todo, index) => (
          <div key={index}>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => updateTodo(index, 'text', e.target.value)}
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo(index, 'completed', e.target.checked)}
            />
            <button type="button" onClick={() => removeTodo(index)}>
              Remove
            </button>
          </div>
        ))}
      </form>
    </section>
  );
}
