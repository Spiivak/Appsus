import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'

import { MailList } from "../cmps/MailList.jsx"
import { MailAsideToolBar } from "../cmps/MailAsideToolBar.jsx"
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailAdd } from "../cmps/MailAdd.jsx"

const { useNavigate, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isAdd, setIsAdd] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    // const [filterBy, setFilterBy] = useState(mailService.getFilterFromQueryString(searchParams))

    useEffect(() => {
        loadMails()
        // setSearchParams(filterBy)
    }, [])
    // }, [filterBy])

    function loadMails() {
        const { email } = mailService.getLoggedInUser()

        mailService.getInboxMails(email)
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
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
    }

    function onOpenDetails(mailId) {
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

    if (!mails) return <div>Loading...</div>

    
    return (
        <section className="mail-index">
            <MailHeader />
            <MailAsideToolBar onToggleAddMail={onToggleAddMail} />
            <MailList mails={mails} onRemoveMail={onRemoveMail} onOpenDetails={onOpenDetails} />
            {isAdd && <MailAdd onAddMail={onAddMail} onToggleAddMail={onToggleAddMail} />}
        </section>
    )
}

