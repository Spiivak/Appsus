import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM


export function MailList({ mails, onRemoveMail, onOpenDetails }) {
    return (
        <section className="mail-list">
            {mails.map((mail) =>
                <article key={mail.id} className="mail-item" onClick={() => onOpenDetails(mail.id)}>
                    <MailPreview mail={mail}/>
                </article>
            )}
        </section>
    )
}
