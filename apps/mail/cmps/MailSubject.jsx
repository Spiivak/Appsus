export function MailSubject({
    subject, isStarred, onMark
}){
    return (
        <section className="mail-subject flex align-center space-between">
                <p>{subject}</p>
                <button
                    className={`btn btn-starred ${isStarred ? 'starred' : ''}`}
                    onClick={() => { onMark('isStarred') }}
                >
                    <i className="fa-regular fa-star"></i>
                </button>
            </section>
    )
}
