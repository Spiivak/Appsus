const { NavLink } = ReactRouterDOM

export function MailMenuOpen(props) {
    const {
        unreadMailsCount,
        onToggleAddMail,
        onChangeToInboxMails,
        onChangeToStarredMails,
        onChangeToSentMails,
        onChangeToDeletedMails,
        setMenuOpen,
        setIsMenuOpen
    } = props

    return (
        <div className="menu-actions grid justify-center align-center">
            <div className="flex justify-center align-center" onClick={() => { onToggleAddMail(); setMenuOpen(false); setIsMenuOpen() }}>
                <button title="Compose" className="btn btn-compose flex align-center" >
                    <i className="fa-regular fa-pen-to-square"></i><span>Compose</span>
                </button>
            </div>

            <NavLink to="/mail">
                <div className="aciton flex justify-center align-center" onClick={() => { onChangeToInboxMails(); setMenuOpen(false); setIsMenuOpen() }}>
                    <button title="Inbox" className="btn btn-inbox">
                        <i className="fa-solid fa-inbox"></i>
                    </button>
                    <span className="txt-span">{`Inbox (${unreadMailsCount})`}</span>
                </div>
            </NavLink>

            <div className="aciton flex justify-center align-center" onClick={() => { onChangeToStarredMails(); setMenuOpen(false); setIsMenuOpen() }}>
                <button title="Starred" className="btn btn-starred">
                    <i className="fa-regular fa-star"></i>
                </button>
                <span className="txt-span">Starred</span>
            </div>

            <div className="aciton flex justify-center align-center" onClick={() => { onChangeToSentMails(); setMenuOpen(false); setIsMenuOpen() }}>
                <button title="Sent" className="btn btn-sent" >
                    <i className="ri-send-plane-2-line"></i>
                </button>
                <span className="txt-span">Sent</span>
            </div>
            
            <div className="aciton flex justify-center align-center" onClick={() => { onChangeToDeletedMails(); setMenuOpen(false); setIsMenuOpen() }}>
                <button title="Trash" className="btn btn-trash" >
                    <i className="ri-delete-bin-line"></i>
                </button>
                <span className="txt-span">Trash</span>
            </div>
            <p></p>
        </div>
    )
}