import { MailPreview } from "./MailPreview.jsx"

const { useState } = React

export function MailList({
    mails, isSent, isDeleted, onRemoveMail, onOpenDetails,
    onMark, onSetReadFilter, onSetSort, onEmptyTrash }) {
    const [filterBy, setFilterBy] = useState(false)
    const [sortOption, setSortOption] = useState({ field: 'sentAt', order: 'desc' })
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const [showSortDropdown, setShowSortDropdown] = useState(false)

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown)
    }

    const toggleSortDropdown = () => {
        setShowSortDropdown(!showSortDropdown)
    }

    const filterByReadStatus = (isRead) => {
        onSetReadFilter({ isRead })
        // console.log('Filter by read status:', isRead)
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

    return (
        <section className="mail-list">
            <section className="mail-list-actions">
                <button className="btn btn-select-filter" onClick={toggleFilterDropdown}>
                    {!filterBy && <i className="fa-regular fa-square"></i>}
                    {filterBy === 'all' && <i className="fa-regular fa-square-check"></i>}
                    {filterBy === 'read' && <i className="fa-regular fa-square-minus"></i>}
                    <i className={`ri-arrow-${showFilterDropdown ? 'up' : 'down'}-s-line`}></i>
                </button>
                {showFilterDropdown && (
                    <div className="filter-dropdown">
                        <button onClick={() => {
                            filterByReadStatus('all')
                            setFilterBy('none')
                        }}>None</button>
                        <button onClick={() => {
                            filterByReadStatus('all')
                            setFilterBy('all')
                        }}>All</button>
                        <button onClick={() => {
                            filterByReadStatus(true)
                            setFilterBy('read')
                        }}>Read</button>
                        <button onClick={() => {
                            filterByReadStatus(false)
                            setFilterBy('read')
                        }}>Unread</button>
                    </div>
                )}

                <button className="btn btn-select-sort" onClick={toggleSortDropdown}>
                    {sortOption.field === 'sentAt' ? 'Date' : 'Title'}
                    <i className={`ri-arrow-${showSortDropdown ? 'up' : 'down'}-s-line`}></i>
                </button>
                {showSortDropdown && (
                    <div className="sort-dropdown">
                        <button onClick={() => sortBy('sentAt', 'desc')}>Date Desc</button>
                        <button onClick={() => sortBy('sentAt', 'asc')}>Date Asc</button>
                        <button onClick={() => sortBy('subject', 'desc')}>Title Desc</button>
                        <button onClick={() => sortBy('subject', 'asc')}>Title Asc</button>
                    </div>
                )}

                {isDeleted &&
                    <button title="Empty Trash" className="btn btn-empty-trash" onClick={onEmptyTrash}>
                        <i className="ri-delete-bin-line"></i>
                    </button>
                }
            </section>
            {/* <section className="mails-container"> */}
            {sortedMails.map((mail) =>
                <article key={mail.id} className="mail-item" onClick={() => onOpenDetails(mail.id)}>
                    <MailPreview mail={mail} isSent={isSent} onRemoveMail={onRemoveMail} onMark={onMark} />
                </article>
            )}
            {/* </section> */}

        </section>
    )
}
