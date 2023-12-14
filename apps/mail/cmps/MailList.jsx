import { MailPreview } from "./MailPreview.jsx"

const { useState } = React

export function MailList({ mails, onRemoveMail, onOpenDetails, onMarkRead, onSetReadFilter }) {
    // console.log('mails:', mails)
    const sortedMails = [...mails].sort((a, b) => b.sentAt - a.sentAt)
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown)
    }

    const filterByReadStatus = (isRead) => {
        onSetReadFilter({isRead})
        console.log('Filter by read status:', isRead)
        setShowFilterDropdown(false)
    }

    return (
        <section className="mail-list">
            <section className="mail-list-actions">
                <div>
                    <button onClick={toggleFilterDropdown}>Filter</button>
                    {showFilterDropdown && (
                        <div className="filter-dropdown">
                            <button onClick={() => filterByReadStatus('all')}>All</button>
                            <button onClick={() => filterByReadStatus(true)}>Read</button>
                            <button onClick={() => filterByReadStatus(false)}>Unread</button>
                        </div>
                    )}
                </div>
            </section>
            {/* <section className="mails-container"> */}
            {sortedMails.map((mail) =>
                <article key={mail.id} className="mail-item" onClick={() => onOpenDetails(mail.id)}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} isSent={false} onMarkRead={onMarkRead} />
                </article>
            )}
            {/* </section> */}

        </section>
    )
}
