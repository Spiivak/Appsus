import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailHeaderActions } from '../cmps/MailHeaderActions.jsx'
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
                    <img src="assets/img/gmail.png" alt="" />
                </Link>
            </div>

            <MailFilter filterBy={filterBy} onSetSearchFilter={onSetSearchFilter} />
            
            <MailHeaderActions onToggleModal={onToggleModal} />

            {isUserModalOpen && <UserModal user={user} onClose={onToggleModal} />}
        </header>
    )
}
