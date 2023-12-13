import { mailService } from '../services/mail.service.js'
import { MailList } from "../cmps/MailList.jsx"

const { Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
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

    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            <h1>Welcome to Mail index!</h1>
            <MailList mails={mails} onRemoveMail={onRemoveMail}/>
        </section>
    )
}

