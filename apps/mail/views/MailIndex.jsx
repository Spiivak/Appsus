import { mailService } from '../services/mail.service.js'

import { MailList } from "../cmps/MailList.jsx"
import { MailSent } from "../cmps/MailSent.jsx"
import { MailDetails } from "../views/MailDetails.jsx"
import { MailAsideToolBar } from "../cmps/MailAsideToolBar.jsx"
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailAdd } from "../cmps/MailAdd.jsx"

const { useNavigate, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [mailId, setMailId] = useState(null)

    const [isAdd, setIsAdd] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [isPreview, setIsPreview] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromQueryString(searchParams))
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
        // console.log('activated:')
        // }, [isSent])
    }, [isSent, filterBy])

    function loadMails() {
        const { email } = mailService.getLoggedInUser()
        if (!isSent) {
            console.log('filterBy:', filterBy)
            mailService.getInboxMails({ filterBy, email })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else {
            mailService.getSentMails({ filterBy, email })
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        }
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => {
                    return prevMails.filter(mail => mail.id !== mailId)
                })
                // showSuccessMsg(`Mail successfully removed!`)
            })
            .catch(err => {
                // showErrorMsg(`Error removing Mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    function onMarkRead(mailId) {
        mailService.get(mailId)
            .then(mail => {
                mail.isRead = !mail.isRead;
                return mailService.save(mail);
            })
            .then(() => {
                setMails(prevMails => {
                    return prevMails.map(mail => {
                        if (mail.id === mailId) {
                            return { ...mail, isRead: !mail.isRead }
                        }
                        return mail
                    })
                })
                // showSuccessMsg(`Mail successfully marked as read/unread!`)
            })
            .catch(err => {
                // showErrorMsg(`Error marking mail as read/unread: ${mailId}`)
                console.log('err:', err)
            })
    }

    function onSetSearchFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        // console.log('filterBy:', filterBy)
    }

    function onSetReadFilter(filterBy) {
        console.log('filterBy change:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onOpenDetails(mailId) {
        setIsSent(false)
        setIsPreview(true)
        setMailId(mailId)
        navigate(`/mail/${mailId}`)
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

    const onChangeToSentMails = () => {
        setIsSent(isSent => setIsSent(true))
    }

    const onChangeToInboxMails = () => {
        setIsSent(isSent => setIsSent(false))
    }

    if (!mails) return <div>Loading...</div>
    // console.log('isPreview:', isPreview)
    // console.log('isSent:', isSent)
    // console.log('isAdd:', isAdd)
    return (
        <section className="mail-index">
            <MailHeader filterBy={filterBy} onSetSearchFilter={onSetSearchFilter} />
            <MailAsideToolBar
                onToggleAddMail={onToggleAddMail}
                onChangeToInboxMails={onChangeToInboxMails}
                onChangeToSentMails={onChangeToSentMails}
            />

            {!isSent && !isPreview &&
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    onMarkRead={onMarkRead}
                    onOpenDetails={onOpenDetails}
                    onSetReadFilter={onSetReadFilter}
                />}
            {isSent && !isPreview &&
                <MailSent
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    onOpenDetails={onOpenDetails}
                    onChangeToSentMails
                />}
            {isPreview && !isSent && mailId &&
                <MailDetails mailId={mailId} />
            }
            {isAdd &&
                <MailAdd
                    onAddMail={onAddMail}
                    onToggleAddMail={onToggleAddMail}
                />}
        </section>
    )
}

