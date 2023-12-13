import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

// ROUTING
export function MailDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [mail, setMail] = useState(null)
    // const [nextBookId, setNextBookId] = useState(null)
    // const [prevBookId, setPrevBookId] = useState(null)

    useEffect(() => {
        loadMail()
        // }, [mailId])
    }, [params.mailId])

    function loadMail() {
        // mailService.get(mailId)
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(error => {
                console.log('error:', error)
                navigate('/mail')
            })
    }

    // function setNegMails() {
    //     mailService.getNegmailId(params.mailId, 1)
    //         .then(setNextMailId)
    //     mailService.getNegmailId(params.mailId, -1)
    //         .then(setPrevMailId)
    // }

    function onRemoveMail() {
        mailService.remove(params.mailId)
            .then(() => {
                navigate('/mail')
                // showSuccessMsg(`Mail successfully removed!`)
            })
            .catch(err => {
                // showErrorMsg(`Error removing Mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>

    console.log('mail:', mail)
    return (
        <section className="mail-details">
            <section className="actions-section">
                <section>
                    <button className="btn-back" onClick={onBack}>Back</button>
                    <button className="btn-back" onClick={onRemoveMail}>Remove</button>
                    <button className="btn-unRead">UnRead</button>
                    <button className="btn-createNote">createNote</button>
                </section>
                <section>
                    <span>1 of 1</span>
                    <button className="btn-prev-mail">Prev</button>
                    <button className="btn-next-mail">Next</button>
                </section>
            </section>
            <h1 className="mail-subject">
                {mail.subject}
                <button className="">star</button>
            </h1>
            <section className="info-section">
                <span className="from-name-only">{mail.from}name only</span>
                <span className="from-full-mail">{mail.from}full mail</span>
                <span>{mail.sentAt}</span>
            </section>
        </section>
    )
}