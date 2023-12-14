import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

// ROUTING
export function MailDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [mail, setMail] = useState(null)
    const [isRead, setIsRead] = useState(null)

    useEffect(() => {
        loadMail()
        console.log('isRead use:', isRead)
    }, [params.mailId, isRead])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                if (!mail.isRead) setMailIsRead(mail)
                setMail(mail)
                console.log('isRead:', isRead)
            })
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

    function setMailIsRead(mail) {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.save(updatedMail)
    }

    function onMarkReadBtn() {
        console.log('mail:', mail)
        const updatedMail = { ...mail, isRead: !mail.isRead }
        console.log("updatedMail:", updatedMail)
        mailService.save(updatedMail)
            .then((updatedMail) => {
                setIsRead(updatedMail.isRead)
            })
            .catch(err => {
                // showErrorMsg(`Error removing Mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    if (!mail) return <div>Loading...</div>

    // console.log('mail:', mail)
    return (
        <section className="mail-details">
            <section className="actions-section">
                <section>
                    <button title="back-button" className="btn btn-back" onClick={onBack}>
                        <i className="ri-arrow-left-line"></i>
                    </button>
                    <button title="delete-button" className="btn btn-delete" onClick={onRemoveMail}>
                        <i className=" ri-delete-bin-line"></i>
                    </button>
                    {mail.isRead &&
                        <button
                            title="Mark as Unread"
                            className="btn"
                            onClick={onMarkReadBtn}
                        >
                            <i className="ri-mail-unread-line"></i>
                        </button>
                    }
                    {!mail.isRead &&
                        <button
                            title="Mark as Read"
                            className="btn"
                            onClick={onMarkReadBtn}
                        >
                            <i className="ri-mail-open-line"></i>
                        </button>
                    }
                    <button className="btn btn-createNote">createNote</button>
                </section>
                <section>
                    <span>1 of 1</span>
                    <button className="btn btn-prev-mail">Prev</button>
                    <button className="btn btn-next-mail">Next</button>
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
            <section className="mail-body">
                <p>{mail.body}</p>
            </section>
        </section>
    )
}