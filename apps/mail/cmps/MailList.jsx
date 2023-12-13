import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM


export function MailList({ mails, onRemoveMail }) {
    return (
        <section className="mail-list">
            {mails.map((mail) =>
                <article key={mail.id} className="mail-item">
                    <MailPreview mail={mail}/>
                </article>
            )}
        </section>
    )
}
