const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {
	return (
		<header className="note-header flex justify-center align-center full">
			<div className="header-logo flex justify-center align-center">
				<button className="btn btn-bars">
                <i className="ri-menu-fill"></i>
				</button>
				<Link to="/note">
                    <div className="note-logo flex justify-center align-center">
					<img src="assets\img\keep.png" alt="" />
                    <span>Keep</span>
                    </div>
				</Link>
			</div>

			<div className="header-actions flex space-between">
				<button className="btn btn-about">
                <i className="ri-information-2-line"></i>
				</button>
				<button className="btn btn-settings">
                <i className="ri-settings-2-line"></i>
				</button>
				<button className="btn btn-user">
                <i className="ri-account-circle-line"></i>
				</button>
			</div>
		</header>
	)
}
