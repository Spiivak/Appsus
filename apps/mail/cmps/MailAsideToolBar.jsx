const { NavLink } = ReactRouterDOM
const { useState } = React

export function MailAsideToolBar({
    unreadMailsCount,
    onToggleAddMail,
    onChangeToInboxMails,
    onChangeToSentMails,
    onChangeToStarredMails,
    onChangeToDeletedMails }) {
    const [isMenuOpen, setMenuOpen] = useState(false)

    const handleToggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    const handleMouseEnter = () => {
        setMenuOpen(true)
    }

    const handleMouseLeave = () => {
        setMenuOpen(false)
    }

    return (
        <aside
            className={`mail-aside-tool-bar ${isMenuOpen ? 'open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="btn btn-bars" onClick={handleToggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </button>

            {!isMenuOpen &&
                <div className="menu-actions grid justify-center align-center">
                    <button className="btn btn-compose" onClick={onToggleAddMail}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>

                    <NavLink to="/mail">
                        <button className={`btn btn-inbox ${unreadMailsCount > 0 ? 'unread' : ''}`} onClick={onChangeToInboxMails}>
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
                    <p></p>
                </div>
            }
            {isMenuOpen &&
                <div className="menu-actions grid justify-center align-center">
                    <div className="flex justify-center align-center" onClick={onToggleAddMail}>
                        <button className="btn btn-compose" >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        Compose
                    </div>

                    <NavLink to="/mail">
                        <div className="flex justify-center align-center" onClick={onChangeToInboxMails}>

                            <button className="btn btn-inbox">
                                <i className="fa-solid fa-inbox"></i>
                            </button>
                            {`Inbox (${unreadMailsCount})`}
                        </div>
                    </NavLink>

                    <div className="flex justify-center align-center" onClick={onChangeToStarredMails}>
                        <button className="btn btn-starred">
                            <i className="fa-regular fa-star"></i>
                        </button>
                        Starred
                    </div>
                    <div className="flex justify-center align-center" onClick={onChangeToSentMails}>
                        <button className="btn btn-sent" >
                            <i className="ri-send-plane-2-line"></i>
                        </button>
                        Sent
                    </div>
                    <div className="flex justify-center align-center" onClick={onChangeToDeletedMails}>
                        <button className="btn btn-trash" >
                            <i className="ri-delete-bin-line"></i>
                        </button>
                        Trash
                    </div>
                    <p></p>
                </div>
            }
        </aside>
    )

}
