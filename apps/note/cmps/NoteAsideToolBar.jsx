const { NavLink } = ReactRouterDOM

export function NoteAsideToolBar() {
    return (
        <aside className="app-aside-tool-bar">

            <div className="grid justify-center align-center">
                <button className="btn btn-bars"><i className="fa-solid fa-bars"></i></button>
                <button className="btn btn-inbox"><i className="fa-solid fa-inbox"></i></button>
                <button className="btn btn-important"><i className="ri-bookmark-line"></i></button>
                <button className="btn btn-trash"><i className="ri-delete-bin-line"></i></button>
            <button className="btn btn-create-label"><i className="ri-add-line"></i></button>

            </div>
        </aside>
    )

}