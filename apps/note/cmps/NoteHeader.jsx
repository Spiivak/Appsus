
const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {
    return <header className="note-header flex justify-center align-center full">
        <div className="left-side flex">
            <Link to="/mail">
                <img src="../assets/img/keep.png" alt="" />
            </Link>
        </div>

        <div className="left">
            <button className="btn btn-about"><i className="fa-regular fa-circle-question"></i></button>
            <button className="btn btn-settings"><i className="fa-solid fa-gear"></i></button>
            <button className="btn btn-user"><i className="fa-regular fa-circle-user"></i></button>
        </div>
    </header>
}
