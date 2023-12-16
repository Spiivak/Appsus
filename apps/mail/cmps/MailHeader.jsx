import { MailFilter } from "../cmps/MailFilter.jsx"

const { Link, NavLink } = ReactRouterDOM

export function MailHeader({ filterBy, onSetSearchFilter, onOpenMenu }) {
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
                {/* <button><img src="" alt="" /></button> */}
                <button className="btn btn-user"><i className="fa-regular fa-circle-user"></i></button>
            </div>
        </header>
    )
}
