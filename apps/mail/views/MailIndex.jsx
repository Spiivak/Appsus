import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'

import { MailList } from "../cmps/MailList.jsx"
import { MailSent } from "../cmps/MailSent.jsx"
import { MailAsideToolBar } from "../cmps/MailAsideToolBar.jsx"
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailAdd } from "../cmps/MailAdd.jsx"

const { useNavigate, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [isPreview, setIsPreview] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromQueryString(searchParams))
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    // }, [isSent])
    }, [isSent, filterBy])

    function loadMails() {
        const { email } = mailService.getLoggedInUser()
        if (!isSent) {
            mailService.getInboxMails({filterBy, email})
                .then(mails => setMails(mails))
                .catch(err => console.log('err:', err))
        } else {
            mailService.getSentMails({filterBy, email})
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
                showSuccessMsg(`Mail successfully removed!`)
            })
            .catch(err => {
                showErrorMsg(`Error removing Mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        console.log('filterBy:', filterBy)
    }

    function onOpenDetails(mailId) {
        setIsSent(false)
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


    return (
        <section className="mail-index">
            <MailHeader filterBy={filterBy} onSetFilter={onSetFilter}/>
            <MailAsideToolBar
                onToggleAddMail={onToggleAddMail}
                onChangeToInboxMails={onChangeToInboxMails}
                onChangeToSentMails={onChangeToSentMails}
            />
            {!isSent && !isPreview &&
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    onOpenDetails={onOpenDetails}
                />}
            {isSent && 
                <MailSent
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    onOpenDetails={onOpenDetails}
                    onChangeToSentMails
                />}
            {isPreview}
            {isAdd &&
                <MailAdd
                    onAddMail={onAddMail}
                    onToggleAddMail={onToggleAddMail}
                />}
        </section>
    )
}

