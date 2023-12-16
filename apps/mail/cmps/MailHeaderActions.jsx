export function MailHeaderActions({ onToggleModal }) {
    return (
        <div className="mail-header-actions">
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
    )
}
