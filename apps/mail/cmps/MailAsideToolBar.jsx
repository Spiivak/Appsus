const { NavLink } = ReactRouterDOM

export function MailAsideToolBar(
    { onToggleAddMail,
        onChangeToInboxMails,
        onChangeToSentMails,
        onChangeToStarredMails,
        onChangeToDeletedMails
    }
    ){
    return (
        <aside className="mail-aside-tool-bar">
            <div className="grid justify-center align-center">
                <button className="btn btn-bars">
                    <i className="fa-solid fa-bars"></i>
                </button>

                <button className="btn btn-compose" onClick={onToggleAddMail}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>

                <NavLink to="/mail">
                    <button className="btn btn-inbox" onClick={onChangeToInboxMails}>
                        <i className="fa-solid fa-inbox"></i>
                    </button>
                </NavLink>

                <button className="btn btn-starred" onClick={onChangeToStarredMails}>
                    <i className="fa-regular fa-star"></i>
                </button>

                <button className="btn btn-sent" onClick={onChangeToSentMails}>
                    <i className="ri-send-plane-2-line"></i>
                </button>

                <button className="btn btn-trash" onClick={onChangeToDeletedMails}>
                    <i className="ri-delete-bin-line"></i>
                </button>
            </div>
        </aside>
    )

}
