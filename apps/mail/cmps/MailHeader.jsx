const { Link, NavLink } = ReactRouterDOM

export function MailHeader() {
    return <header className="mail-header flex justify-center align-center full">
        <div className="left-side flex">
        <Link to="/">
            <img src="../assets/img/gmail.png" alt="" />
        </Link>
        </div>
        <div className="center flex justify-center align-center">
            <button className="btn btn-search"><i className="fa-solid fa-search"></i></button>
            <input type="search" name="" id="" />
            <button className="btn btn-filter"><i className="fa-solid fa-sliders"></i></button>
        </div>
        <div className="left">
            <button className="btn btn-about"><i className="fa-regular fa-circle-question"></i></button>
            <button className="btn btn-settings"><i className="fa-solid fa-gear"></i></button>
            {/* <button><img src="" alt="" /></button> */}
            <button className="btn btn-user"><i className="fa-regular fa-circle-user"></i></button>
        </div>
        {/* <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav> */}
    </header>
}
