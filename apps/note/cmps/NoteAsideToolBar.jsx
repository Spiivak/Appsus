const { NavLink } = ReactRouterDOM

export function NoteAsideToolBar() {
    return (
        <aside className="note-aside-tool-bar">
            <div className="grid justify-center align-center">
                <button className="btn active-btn"><i className="ri-lightbulb-line"></i><span>Notes</span></button>
                <button className="btn"><i className="ri-notification-line"></i><span>Reminders</span></button>
                <button className="btn"><i className="ri-pencil-line"></i><span>Edit Labels</span></button>
                <button className="btn"><i className="ri-delete-bin-line"></i><span>Archive</span></button>
                <button className="btn"><i className="ri-inbox-archive-line"></i><span>Bin</span></button>
            </div>
        </aside>
    )

}
