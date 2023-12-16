const { NavLink } = ReactRouterDOM


export function MailMenuClose(props) {
    const {
        unreadMailsCount,
        onToggleAddMail,
        onChangeToInboxMails,
        onChangeToStarredMails,
        onChangeToSentMails,
        onChangeToDeletedMails,
    } = props
    
    return (
        <div className="menu-actions grid justify-center align-center">
            <button title="Compose" className="btn btn-compose" onClick={onToggleAddMail}>
                <i className="fa-regular fa-pen-to-square"></i>
            </button>

            <NavLink to="/mail">
                <button title="Inbox" className={`btn btn-inbox ${unreadMailsCount > 0 ? 'unread' : ''}`} onClick={onChangeToInboxMails}>
                    <i className="fa-solid fa-inbox"></i>
                </button>
            </NavLink>

            <button title="Starred" className="btn btn-starred" onClick={onChangeToStarredMails}>
                <i className="fa-regular fa-star"></i>
            </button>

            <button title="Sent" className="btn btn-sent" onClick={onChangeToSentMails}>
                <i className="ri-send-plane-2-line"></i>
            </button>

            <button title="Trash" className="btn btn-trash" onClick={onChangeToDeletedMails}>
                <i className="ri-delete-bin-line"></i>
            </button>
            <p></p>
        </div>
    )
}