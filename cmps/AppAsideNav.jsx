const { Link, NavLink } = ReactRouterDOM

export function AppAsideNav() {
    return (
        <aside className="app-aside-nav">
            <nav>
                <NavLink to="/mail">
                    <div>
                        <img className="btn" src="assets/img/gmail-logo.png" alt="gmail-logo" />
                    </div>
                </NavLink>
                <NavLink to="/note">
                    <div>
                        <img src="assets/img/keep.png" alt="keep-logo" />
                    </div>
                </NavLink>
                {/* <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink> */}
            </nav>
        </aside>
    )

}
