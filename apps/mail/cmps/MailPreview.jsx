
export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">
            <button className="">star</button>
            <span className="mail-from">{mail.from}</span>
            <section>
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-body">{mail.body}</span>
            </section>
            <span className="mail-sentAt">{mail.sentAt}</span>
        </article>
    )
}
