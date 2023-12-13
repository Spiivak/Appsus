import { mailService } from '../services/mail.service.js'
import { MailList } from "../cmps/MailList.jsx"
import { MailAsideToolBar } from "../cmps/MailAsideToolBar.jsx"
import { MailHeader } from '../cmps/MailHeader.jsx'

const { Link, useNavigate, useSearchParams } = ReactRouterDOM

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    // const [filterBy, setFilterBy] = useState(bookService.getFilterFromQueryString(searchParams))

    useEffect(() => {
        loadMails()
        // setSearchParams(filterBy)
    }, [])
    // }, [filterBy])

    function loadMails() {
        mailService.query()
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

    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            {/* <MailHeader/> */}
            {/* <MailAsideToolBar/> */}
            <MailList mails={mails} onRemoveMail={onRemoveMail} onOpenDetails={onOpenDetails}/>
        </section>
    )
}

