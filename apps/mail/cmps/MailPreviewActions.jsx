export function MailPreviewActions({
    onDeleteMail, 
    isRead, 
    onMark, 
    mailIdx, 
    mailsLength, 
    navigateToMail
}) {
    return (
        <section className="mail-preview-actions">
            <section>
                <button title="Delete" className="btn btn-delete" onClick={onDeleteMail}>
                    <i className=" ri-delete-bin-line"></i>
                </button>
                {isRead &&
                    <button title="Mark as Unread" className="btn" onClick={() => { onMark('isRead') }}>
                        <i className="ri-mail-unread-line"></i>
                    </button>
                }
                {!isRead &&
                    <button title="Mark as Read" className="btn" onClick={() => { onMark('isRead') }}>
                        <i className="ri-mail-open-line"></i>
                    </button>
                }
                <button title="Crerate Note" className="btn btn-createNote">
                    <i className="ri-sticky-note-line"></i>
                </button>
            </section>

            <section>
                <span>{`${mailIdx} of ${mailsLength}`}</span>
                <button title="Older Mail" className="btn-prev-mail" onClick={() => navigateToMail(-1)}>
                    <i className="ri-arrow-left-s-line"></i>
                </button>
                <button title="Newer Mail" className="btn-next-mail" onClick={() => navigateToMail(1)}>
                    <i className="ri-arrow-right-s-line"></i>
                </button>
            </section>
        </section>
    )
}
