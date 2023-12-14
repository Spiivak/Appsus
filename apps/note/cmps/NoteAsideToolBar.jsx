const { NavLink } = ReactRouterDOM

export function NoteAsideToolBar() {
    return (
        <aside className="app-aside-tool-bar">

            <div className="grid justify-center align-center">
                <button className="btn btn-bars"><i className="fa-solid fa-bars"></i></button>
                <button className="btn btn-compose"><i className="fa-regular fa-pen-to-square"></i></button>
                <button className="btn btn-inbox"><i className="fa-solid fa-inbox"></i></button>
                <button className="btn btn-starred"><i className="fa-regular fa-star"></i></button>
                {/* <button className="btn btn-snoozed"><i className="fa-regular fa-clock"></i></button> */}
                <button className="btn btn-sent"><i className="ri-send-plane-2-line"></i></button>
                {/* <button className="btn btn-drafts"><i className="ri-sticky-note-line"></i></button> */}
                {/* More */}
                {/* <button className="btn btn-important"><i className="ri-bookmark-line"></i></button>
                <button className="btn btn-all-mail"><i className="ri-mail-line"></i></button> */}
                {/* <button className="btn btn-spam"><i className="ri-spam-line"></i></button> */}
                <button className="btn btn-trash"><i className="ri-delete-bin-line"></i></button>

                {/* More Categories */}
                {/* <button className="btn btn-categories"><i className="ri-window-line"></i></button>
                <button className="btn btn-social"><i className="ri-user-line"></i></button>
                <button className="btn btn-updates"><i className="ri-error-warning-line"></i></button> */}

                {/* rest */}
                {/* <button className="btn btn-manage-labels"><i className="ri-settings-2-line"></i></button>
                <button className="btn btn-create-label"><i className="ri-add-line"></i></button> */}
            </div>
        </aside>
    )

}
