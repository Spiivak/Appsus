import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

import { MailList } from "../cmps/MailList.jsx"
import { MailAsideToolBar } from "../cmps/MailAsideToolBar.jsx"
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailAdd } from "../cmps/MailAdd.jsx"

const { useNavigate, useSearchParams, useParams, Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [unfilteredMails, setUnfilteredMails] = useState(null)

    const [mark, setMark] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [showSentMails, setShowSentMails] = useState(false)
    const [showStarredMails, setShowStarredMails] = useState(false)
    const [showDeletedMails, setShowDeletedMails] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromQueryString(searchParams))
    const [sortOption, setSortOption] = useState({ field: 'sentAt', order: 'desc' })

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy, sortOption, showSentMails, showStarredMails, showDeletedMails, mark])

    // load mails from DB by type
    function loadMails() {
        const { email } = mailService.getLoggedInUser()
        if (!showSentMails && !showStarredMails && !showDeletedMails) {
            mailService.getInboxMails({ filterBy, email })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else if (showSentMails) {
            mailService.getSentMails({ filterBy, email })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else if (showStarredMails) {
            mailService.query({ filterBy, starred: true })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else if (showDeletedMails) {
            mailService.query({ filterBy, isDeleted: true })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        }

        mailService.queryNoFilter()
            .then(mails => setUnfilteredMails(mails))
            .catch(err => console.log('err:', err))
    }

    // Remove mail to Trash
    const onRemoveMail = (mailId) => {
        mailService.get(mailId)
            .then(mail => {
                if (!mail.removedAt) {
                    mail.removedAt = Date.now()
                    return mailService.save(mail)
                } else {
                    onFinalRemoveMail(mail.id)
                }
            }).then(() => {
                setMails(prevMails => {
                    return prevMails.filter(mail => mail.id !== mailId)
                })
            }).then(showSuccessMsg(`Conversation moved to Trash`))
            .catch(err => {
                showErrorMsg(`Error removing Mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    // Remove Mail from DB
    function onFinalRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => {
                    return prevMails.filter(mail => mail.id !== mailId)
                })
                showSuccessMsg(`Conversation successfully removed!`)
            })
            .catch(err => {
                showErrorMsg(`Error removing Mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    // Remove All Mails from DB - Via Btn
    const onEmptyTrash = () => {
        mailService.getDeletedMails({ filterBy, isDeleted: true })
            .then(trashMails => {
                console.log("trashMails:", trashMails)
                return trashMails.reduce((promise, mail) => {
                    return promise.then(() => mailService.remove(mail.id))
                }, Promise.resolve())
            })
            .then(() => {
                setShowDeletedMails(false)
                showSuccessMsg(`Trash successfully emptied!`)
            })
            .catch(err => {
                showErrorMsg(`Error emptying Trash`)
                console.log('Error emptying trash:', err)
            })
    }

    // Change Mail mark in DB
    const onMark = (mailId, prop) => {
        mailService.get(mailId)
            .then(mail => {
                mail[prop] = !mail[prop]
                return mailService.save(mail)
            })
            .then(() => {
                setMails(prevMails => {
                    return prevMails.map(mail => {
                        if (mail.id === mailId) {
                            return { ...mail, [prop]: !mail[prop] }
                        }
                        return mail
                    })
                })

                showSuccessMsg(`Conversation marked successfully!`)
            })
            .catch(err => {
                showErrorMsg(`Error marking mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    const onToggleMark = () => {
        setMark(prevMark => !prevMark)
    }

    // Change FilterBy
    function onSetSearchFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetReadFilter(filterBy) {
        console.log('filterBy change:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    // Navigate to MailDetails Cmp
    function onOpenDetails(mailId) {
        navigate(`/mail/${mailId}`)
        mailService.get(mailId)
            .then(mail => {
                if (!mail.isRead) mail.isRead = true
                return mailService.save(mail)
            })
            .then(() => {
                setMails(prevMails => {
                    return prevMails.map(mail => {
                        if (mail.id === mailId) {
                            return { ...mail, isRead: true }
                        }
                        return mail
                    })
                })
                showSuccessMsg(`Mail successfully marked`)
            })
            .catch(err => {
                showErrorMsg(`Error marking mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    // Save new Mail to DB
    const onAddMail = (newMail) => {
        mailService.save(newMail)
            .then(() => {
                loadMails()
                setIsAdd(isAdd => !isAdd)
            })
            .catch((error) => console.error('Error adding Mail:', error))
    }

    const onToggleAddMail = () => {
        setIsAdd(isAdd => !isAdd)
    }

    const onChangeToSentMails = () => {
        setShowStarredMails(false)
        setShowDeletedMails(false)
        setShowSentMails(true)
    }

    // Render List According to mails filter
    const onChangeToInboxMails = () => {
        setShowSentMails(false)
        setShowStarredMails(false)
        setShowDeletedMails(false)
    }

    const onChangeToStarredMails = () => {
        setShowSentMails(false)
        setShowDeletedMails(false)
        setShowStarredMails(true)
    }

    const onChangeToDeletedMails = () => {
        setShowSentMails(false)
        setShowStarredMails(false)
        setShowDeletedMails(true)
    }

    function onSetSort(newSort) {
        setSortOption(prevSortOption => ({ ...prevSortOption, ...newSort }))
    }

    const handleToggleMenu = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen)
    }

    if (!mails || !unfilteredMails) return <div>Loading...</div>

    const unreadMailsCount = unfilteredMails.reduce((count, mail) => (mail.isRead ? count : count + 1), 0)
    const user = mailService.getLoggedInUser()

    return (
        <section className="mail-index">
            <MailHeader
                filterBy={filterBy}
                onSetSearchFilter={onSetSearchFilter}
                handleToggleMenu={handleToggleMenu}
                user={user}
            />
            <MailAsideToolBar
                unreadMailsCount={unreadMailsCount}
                onToggleAddMail={onToggleAddMail}
                onChangeToInboxMails={onChangeToInboxMails}
                onChangeToSentMails={onChangeToSentMails}
                onChangeToStarredMails={onChangeToStarredMails}
                onChangeToDeletedMails={onChangeToDeletedMails}
                isMenuOpen={isMenuOpen}
                handleToggleMenu={handleToggleMenu}
            />
            {!params.mailId &&
                <MailList
                    mails={mails}
                    showSentMails={showSentMails}
                    showDeletedMails={showDeletedMails}
                    onMark={onMark}
                    onRemoveMail={onRemoveMail}
                    onOpenDetails={onOpenDetails}
                    onSetReadFilter={onSetReadFilter}
                    onSetSort={onSetSort}
                    onEmptyTrash={onEmptyTrash}
                    isMenuOpen={isMenuOpen}
                />}
            {params.mailId &&
                <Outlet
                    onRemoveMail={onRemoveMail}
                    onToggleMark={onToggleMark}
                    onMark={onMark}
                />
            }
            {isAdd &&
                <MailAdd
                    onAddMail={onAddMail}
                    onToggleAddMail={onToggleAddMail}
                />}
        </section>
    )
}

