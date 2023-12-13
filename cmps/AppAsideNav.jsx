const { Link, NavLink } = ReactRouterDOM

export function AppAsideNav() {
    return (
        <aside className="app-aside-nav">
            <nav>
                <NavLink to="/mail"><img src="../assets/img/gmail-logo.png" alt="gmail-logo" /></NavLink>
                <NavLink to="/note"><img src="../assets/img/keep.png" alt="keep-logo" /></NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </aside>
    )

}
