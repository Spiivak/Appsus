export function MailInfoSection({nameOnly, fullName, formattedDate}) {
    return (
        <section className="mail-info-section flex space-between">
            <section className="mail-from-section">
                <span className="from-name-only">{nameOnly}</span>
                <span className="from-full-mail">{`<${fullName}>`}</span>
            </section>
            <span className="date">{formattedDate}</span>
        </section>
    )
}

