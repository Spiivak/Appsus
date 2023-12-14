import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM


export function MailList({ mails, onRemoveMail, onOpenDetails }) {
    // console.log('mails:', mails)
    return (
        <section className="mail-list">
            <section className="mail-list-actions">
                actions
            </section>
            {/* <section className="mails-container"> */}
                {mails.map((mail) =>
                    <article key={mail.id} className="mail-item" onClick={() => onOpenDetails(mail.id)}>
                        <MailPreview mail={mail} onRemoveMail={onRemoveMail} isSent={false} />
                    </article>
                )}
            {/* </section> */}

        </section>
    )
}
