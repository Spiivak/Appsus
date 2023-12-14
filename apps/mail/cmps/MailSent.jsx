import { MailPreview } from "./MailPreview.jsx"

export function MailSent({ mails, onRemoveMail, onOpenDetails }) {
    console.log('mails:', mails)
    return (
        <section className="mail-list">
            <section className="mail-list-actions">
                actions
            </section>
            {mails.map((mail) =>
                <article key={mail.id} className="mail-item" onClick={() => onOpenDetails(mail.id)}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} isSent={true}/>
                </article>
            )}
        </section>
    )
}
