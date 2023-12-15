const { NavLink } = ReactRouterDOM

export function NoteAsideToolBar() {
    return (
        <aside className="note-aside-tool-bar">
            <div className="grid justify-center align-center">
                <button className="btn btn-bars"><i className="fa-solid fa-bars"></i></button>
                <button className="btn btn-compose"><i className="fa-regular fa-pen-to-square"></i></button>
                <button className="btn btn-starred"><i className="fa-regular fa-star"></i></button>
                <button className="btn btn-sent"><i className="ri-send-plane-2-line"></i></button>
                <button className="btn btn-trash"><i className="ri-delete-bin-line"></i></button>
            </div>
        </aside>
    )

}
