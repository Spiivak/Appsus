import { MailFilter } from "../cmps/MailFilter.jsx"
import { UserModal } from '../cmps/UserModal.jsx'

const { Link } = ReactRouterDOM
const { useState } = React

export function MailHeader({ filterBy, onSetSearchFilter, handleToggleMenu, user }) {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    function onToggleModal() {
        setIsUserModalOpen(prevStatus => !prevStatus)
    }

    return (
        <header className="mail-header grid justify-center align-center">
            <button title="Menu" className="btn btn-bars" onClick={handleToggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </button>

            <div className="flex">
                <Link to="/mail">
                    <img src="../assets/img/gmail.png" alt="" />
                </Link>
            </div>

            <MailFilter filterBy={filterBy} onSetSearchFilter={onSetSearchFilter} />

            <div>
                <button title="About" className="btn btn-about">
                    <i className="fa-regular fa-circle-question"></i>
                </button>
                <button title="Settings" className="btn btn-settings">
                    <i className="fa-solid fa-gear"></i>
                </button>
                <button title="User" className="btn btn-user" onClick={onToggleModal}>
                    <i className="fa-regular fa-circle-user"></i>
                </button>
            </div>

            {isUserModalOpen && <UserModal user={user} onClose={onToggleModal} />}
        </header>
    )
}
