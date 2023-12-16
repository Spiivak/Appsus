import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from '../services/mail.service.js'
import { UserModal } from '../cmps/UserModal.jsx'

const { Link } = ReactRouterDOM
const { useState } = React

export function MailHeader({ filterBy, onSetSearchFilter, onOpenMenu }) {
    const user = mailService.getLoggedInUser()
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    function onToggleModal() {
        setIsUserModalOpen(prevStatus => !prevStatus)
    }

    return (
        <header className="mail-header grid justify-center align-center">
            <button className="btn btn-bars" onClick={onOpenMenu}>
                <i className="fa-solid fa-bars"></i>
            </button>
            <div className="left-side flex">
                <Link to="/mail">
                    <img src="../assets/img/gmail.png" alt="" />
                </Link>
            </div>
            <MailFilter filterBy={filterBy} onSetSearchFilter={onSetSearchFilter} />

            <div className="left">
                <button className="btn btn-about"><i className="fa-regular fa-circle-question"></i></button>
                <button className="btn btn-settings"><i className="fa-solid fa-gear"></i></button>
                <button className="btn btn-user" onClick={onToggleModal}><i className="fa-regular fa-circle-user"></i></button>
            </div>

            {isUserModalOpen && <UserModal user={user} onClose={onToggleModal} />}
        </header>
    )
}
