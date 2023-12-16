import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [mail, setMail] = useState(null)

    const [isRead, setIsRead] = useState(null)
    const [isStarred, setIsStarred] = useState(false)

    const [mailIdx, setMailIdx] = useState(null)
    const [mailsLength, setMailsLength] = useState(null)

    useEffect(() => {
        loadMail()
        getMailIdx()
    }, [params.mailId, isRead, isStarred])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
                setIsStarred(mail.isStarred)
            })
            .catch(error => {
                console.error('error:', error)
                navigate('/mail')
            })
    }

    // function setNegMails() {
    //     mailService.getNegmailId(params.mailId, 1)
    //         .then(setNextMailId)
    //     mailService.getNegmailId(params.mailId, -1)
    //         .then(setPrevMailId)
    // }

    function onBack() {
        navigate('/mail')
    }

    function onMark(prop) {
        const updatedMail = { ...mail, [prop]: !mail[prop] }
        mailService.save(updatedMail)
            .then((updatedMail) => {
                setIsRead(updatedMail[prop])
                setMail(updatedMail)
            })
            .catch(err => {
                // showErrorMsg(`Error removing Mail: ${mailId}`)
                console.log('err:', err)
            })
    }

    function getMailIdx() {
        console.log('params.mailId:', params.mailId)
        mailService.queryNoFilter()
            .then(mails => {
                const currentMailIndex = mails.findIndex(mail => mail.id === params.mailId)
                const mailsLength = mails.length
                setMailIdx(currentMailIndex + 1)
                setMailsLength(mailsLength)
            })
    }

    function onDeleteMail() {
        onRemoveMail(params.mailId)
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>

    const formattedDate = new Date(mail.sentAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })

    if (!mail) return <div>Loading...</div>
    console.log('mail:', mail)
    return (
        <section className="mail-details">
            <button title="Back to Inbox" className="btn btn-back" onClick={onBack}>
                <i className="ri-arrow-left-line"></i>
            </button>

            <section className="actions-section">
                <section>
                    <button title="Delete" className="btn btn-delete" onClick={onDeleteMail}>
                        <i className=" ri-delete-bin-line"></i>
                    </button>
                    {mail.isRead &&
                        <button title="Mark as Unread" className="btn"onClick={() => {onMark('isRead')}}>
                            <i className="ri-mail-unread-line"></i>
                        </button>
                    }
                    {!mail.isRead &&
                        <button title="Mark as Read" className="btn" onClick={() => {onMark('isRead')}}>
                            <i className="ri-mail-open-line"></i>
                        </button>
                    }
                    <button title="Crerate Note" className="btn btn-createNote">
                        <i className="ri-sticky-note-line"></i>
                    </button>
                </section>

                <section>
                    <span>{`${mailIdx} of ${mailsLength}`}</span>
                    <button title="Older Mail" className="btn-prev-mail">
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <button title="Newer Mail" className="btn-next-mail">
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </section>
            </section>
            <section className="mail-subject">
                <p>{mail.subject}</p>
                <button
                    className={`btn btn-starred ${mail.isStarred ? 'starred' : ''}`}
                    onClick={() => {
                        onMark('isStarred')
                    }}
                >
                    {/* <button className={`btn btn-starred`}> */}
                    <i className="fa-regular fa-star"></i>
                </button>
            </section>
            <section className="info-section">
                <section className="mail-from-section">
                    <span className="from-name-only">{(mail.from).split('@')[0]}</span>
                    <span className="from-full-mail">{`<${mail.from}>`}</span>
                </section>
                <span className="date">{formattedDate}</span>
            </section>
            <section className="mail-body">
                <p>{mail.body}</p>
            </section>
        </section>
    )
}