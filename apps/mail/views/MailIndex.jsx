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

    const [Mark, setMark] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [isStarred, setIsStarred] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromQueryString(searchParams))
    const [sortOption, setSortOption] = useState({ field: 'sentAt', order: 'desc' })

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy, sortOption, isSent, isStarred, isDeleted, Mark])

    function loadMails() {
        const { email } = mailService.getLoggedInUser()
        if (!isSent && !isStarred && !isDeleted) {
            mailService.getInboxMails({ filterBy, email })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else if (isSent) {
            mailService.getSentMails({ filterBy, email })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else if (isStarred) {
            mailService.getStarredMails({ filterBy, starred: isStarred })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else if (isDeleted) {
            mailService.getDeletedMails({ filterBy, isDeleted: true })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        }
    }

    const onRemoveMail = (mailId) => {
        mailService.get(mailId)
            .then(mail => {
                console.log('mail.removedAt:', mail.removedAt)
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

    const onEmptyTrash = () => {
        console.log('isDeleted:', isDeleted)
        mailService.getDeletedMails({ filterBy, isDeleted: true })
            .then(trashMails => {
                console.log("trashMails:", trashMails)
                return trashMails.reduce((promise, mail) => {
                    return promise.then(() => mailService.remove(mail.id))
                }, Promise.resolve())
            })
            .then(() => {
                setIsDeleted(false)
                showSuccessMsg(`Trash successfully emptied!`)
            })
            .catch(err => {
                showErrorMsg(`Error emptying Trash`)
                console.log('Error emptying trash:', err)
            })
    }

    const onMark = (mailId, prop) => {
        console.log('prop:', prop)
        let mailMark
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

                showSuccessMsg(`Conversation marked as read/unread!`)
            })
            .catch(err => {
                showErrorMsg(`Error marking mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    function onSetSearchFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetReadFilter(filterBy) {
        console.log('filterBy change:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

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
                showSuccessMsg(`Mail successfully marked as read/unread!`)
            })
            .catch(err => {
                showErrorMsg(`Error marking mail as read/unread: ${mailId}`)
                console.log('err:', err)
            })
    }

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

    const onToggleMark = () => {
        setMark(prevMark => !prevMark)
    }

    const onChangeToSentMails = () => {
        setIsStarred(false)
        setIsDeleted(false)
        setIsSent(true)
    }

    const onChangeToInboxMails = () => {
        setIsSent(false)
        setIsStarred(false)
        setIsDeleted(false)
    }

    const onChangeToStarredMails = () => {
        setIsSent(false)
        setIsDeleted(false)
        setIsStarred(true)
    }

    const onChangeToDeletedMails = () => {
        setIsSent(false)
        setIsStarred(false)
        setIsDeleted(true)
    }

    function onSetSort(newSort) {
        setSortOption(prevSortOption => ({ ...prevSortOption, ...newSort }))
    }

    if (!mails) return <div>Loading...</div>

    const unreadMailsCount = mails.reduce((count, mail) => (mail.isRead ? count : count + 1), 0)

    return (
        <section className="mail-index">
            <MailHeader filterBy={filterBy} onSetSearchFilter={onSetSearchFilter} />
            <MailAsideToolBar
                unreadMailsCount={unreadMailsCount}
                onToggleAddMail={onToggleAddMail}
                onChangeToInboxMails={onChangeToInboxMails}
                onChangeToSentMails={onChangeToSentMails}
                onChangeToStarredMails={onChangeToStarredMails}
                onChangeToDeletedMails={onChangeToDeletedMails}
            />
            {!params.mailId &&
                <MailList
                    mails={mails}
                    isSent={isSent}
                    onRemoveMail={onRemoveMail}
                    onMark={onMark}
                    onOpenDetails={onOpenDetails}
                    onSetReadFilter={onSetReadFilter}
                    onSetSort={onSetSort}
                    onEmptyTrash={onEmptyTrash}
                    isDeleted={isDeleted}
                />}
            {params.mailId &&
                <Outlet onRemoveMail={onRemoveMail} onToggleMark={onToggleMark} onMark={onMark} />
            }
            {isAdd &&
                <MailAdd
                    onAddMail={onAddMail}
                    onToggleAddMail={onToggleAddMail}
                />}
        </section>
    )
}

