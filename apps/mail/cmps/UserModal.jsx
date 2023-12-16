
export function UserModal({ user, onClose }) {
  return (
    <div className="user-modal flex align-center justify-center">
      <div className="modal-content">
        <h2>User Information</h2>
        <p>Name: <span>{user.fullname}</span></p>
        <p>Email: <span>{user.email}</span></p>
        <button title="Close Modal" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}