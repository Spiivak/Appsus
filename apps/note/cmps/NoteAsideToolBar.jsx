const { NavLink } = ReactRouterDOM

export function NoteAsideToolBar() {
    return (
        <aside className="note-aside-tool-bar">
            <div className="grid justify-center align-center">
                <button className="note-btn btn-notes"><i className="ri-lightbulb-line"></i></button>
                <button className="note-btn btn-reminders"><i className="ri-notification-line"></i></button>
                <button className="note-btn btn-sent"><i className="ri-pencil-line"></i></button>
                <button className="note-btn btn-trash"><i className="ri-delete-bin-line"></i></button>
                <button className="note-btn btn-trash"><i className="ri-inbox-archive-line"></i></button>
            </div>
        </aside>
    )

}
