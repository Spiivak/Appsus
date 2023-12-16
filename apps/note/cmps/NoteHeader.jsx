const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {
	return (
		<header className="note-header flex justify-center align-center full">
			<div className="left-side flex">
				<button className="note-btn btn-bars">
					<i className="fa-solid fa-bars"></i>
				</button>
				<Link to="/note">
					<img src="assets/img/keep.png" alt="" />
				</Link>
			</div>

			<div className="left">
				<button className="note-btn btn-about">
					<i className="fa-regular fa-circle-question"></i>
				</button>
				<button className="note-btn btn-settings">
					<i className="fa-solid fa-gear"></i>
				</button>
				<button className="note-btn btn-user">
					<i className="fa-regular fa-circle-user"></i>
				</button>
			</div>
		</header>
	)
}
