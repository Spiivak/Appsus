
export function UserModal({ user, onClose }) {
  return (
    <div className="user-modal">
      <div className="modal-content">
        <h2>User Information</h2>
        <p>Name: <span>{user.fullname}</span></p>
        <p>Email: <span>{user.email}</span></p>
        {/* Add other user information as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}