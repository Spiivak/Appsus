export function MailListActions(props) {
    const {
        toggleFilterDropdown,
        filterByReadStatus,
        showDeletedMails,
        onEmptyTrash,
        showSortDropdown,
        toggleSortDropdown,
        showFilterDropdown,
        setFilterBy,
        sortBy,
        sortOption,
        filterBy,
    } = props
    
    return (
        <section className="mail-list-actions">
            <button title="Select Filter" className="btn btn-select-filter" onClick={toggleFilterDropdown}>
                {!filterBy &&
                    <i className="fa-regular fa-square"></i>
                }
                {filterBy === 'all' &&
                    <i className="fa-regular fa-square-check"></i>
                }
                {filterBy === 'read' &&
                    <i className="fa-regular fa-square-minus"></i>
                }
                <i className={`ri-arrow-${showFilterDropdown ? 'up' : 'down'}-s-line`}></i>
            </button>

            {showFilterDropdown && (
                <div className="filter-dropdown flex">
                    <button title="Filter by None" onClick={() => {
                        filterByReadStatus('all')
                        setFilterBy('none')
                    }}>None</button>
                    <button title="Filter by All" onClick={() => {
                        filterByReadStatus('all')
                        setFilterBy('all')
                    }}>All</button>
                    <button title="Filter by Read" onClick={() => {
                        filterByReadStatus(true)
                        setFilterBy('read')
                    }}>Read</button>
                    <button title="Filter by unRead" onClick={() => {
                        filterByReadStatus(false)
                        setFilterBy('read')
                    }}>Unread</button>
                </div>
            )}

            <button title="Sort" className="btn btn-select-sort" onClick={toggleSortDropdown}>
                {sortOption.field === 'sentAt' ? 'Date' : 'Title'}
                <i className={`ri-arrow-${showSortDropdown ? 'up' : 'down'}-s-line`}></i>
            </button>

            {showSortDropdown && (
                <div className="sort-dropdown flex">
                    <button onClick={() => sortBy('sentAt', 'desc')}>Date Desc</button>
                    <button onClick={() => sortBy('sentAt', 'asc')}>Date Asc</button>
                    <button onClick={() => sortBy('subject', 'desc')}>Title Desc</button>
                    <button onClick={() => sortBy('subject', 'asc')}>Title Asc</button>
                </div>
            )}

            {showDeletedMails &&
                <button title="Empty Trash" className="btn btn-empty-trash" onClick={onEmptyTrash}>
                    <i className="ri-delete-bin-line"></i>
                </button>
            }
        </section>
    )
}