import { MailPreview } from "./MailPreview.jsx"
import { MailListActions } from "./MailListActions.jsx"

const { useState } = React

export function MailList(props) {
    const {
        mails, showSentMails, showDeletedMails, onRemoveMail, onOpenDetails,
        onMark, onSetReadFilter, onSetSort, onEmptyTrash, isMenuOpen
    } = props

    const [filterBy, setFilterBy] = useState(false)
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const [sortOption, setSortOption] = useState({ field: 'sentAt', order: 'desc' })

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown)
    }

    const toggleSortDropdown = () => {
        setShowSortDropdown(!showSortDropdown)
    }

    const filterByReadStatus = (isRead) => {
        onSetReadFilter({ isRead })
        setShowFilterDropdown(false)
    }

    const sortBy = (field, order) => {
        onSetSort({ field, order })
        setSortOption({ field, order })
        setShowSortDropdown(false)
    }

    const sortedMails = [...mails].sort((a, b) => {
        const aValue = a[sortOption.field];
        const bValue = b[sortOption.field];

        if (aValue < bValue) {
            return sortOption.order === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
            return sortOption.order === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    })

    const listProps = {
        sortBy,
        toggleFilterDropdown,
        filterByReadStatus,
        toggleSortDropdown,
        sortOption,
        filterBy,
        showSortDropdown,
        showDeletedMails,
        onEmptyTrash,
        showFilterDropdown,
        setFilterBy,
    }

    return (
        <section className={`mail-list ${isMenuOpen ? 'menu-open' : ''}`}>

            <MailListActions {...listProps} />

            <section className="mails-container">
                {sortedMails.length > 0 ?
                    (sortedMails.map((mail) => (
                        <article key={mail.id} className="mail-item" onClick={() => onOpenDetails(mail.id)}>
                            <MailPreview mail={mail} showSentMails={showSentMails} onRemoveMail={onRemoveMail} onMark={onMark} />
                        </article>
                    ))
                    ) : (
                        <span className="no-conversations-msg flex justify-center">
                            {`No conversations in ${showSentMails ? 'Sent' : showDeletedMails ? 'Trash' : 'Inbox'}`}
                            </span>
                    )}
            </section>

        </section>
    )
}
