import { mailService } from '../services/mail.service.js'
import { MailPreviewActions } from '../cmps/MailPreviewActions.jsx'
import { MailSubject } from '../cmps/MailSubject.jsx'
import { MailInfoSection } from '../cmps/MailInfoSection.jsx'

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
        mailService.queryNoFilter()
            .then(mails => {
                const currentMailIndex = mails.findIndex(mail => mail.id === params.mailId)
                const mailsLength = mails.length
                setMailIdx(currentMailIndex + 1)
                setMailsLength(mailsLength)
            })
    }

    function navigateToMail(offset) {
        mailService.queryNoFilter()
            .then(mails => {
                if (mailIdx + offset >= 1 && mailIdx + offset <= mailsLength) {
                    const nextMailId = mails[mailIdx + offset - 1].id
                    navigate(`/mail/${nextMailId}`)
                }
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

    return (
        <section className="mail-details">
            <button title="Back to Inbox" className="btn btn-back" onClick={onBack}>
                <i className="ri-arrow-left-line"></i>
            </button>

            <MailPreviewActions
                onDeleteMail={onDeleteMail}
                isRead={mail.isRead}
                onMark={onMark}
                mailIdx={mailIdx}
                mailsLength={mailsLength}
                navigateToMail={navigateToMail} />

            <MailSubject subject={mail.subject} isStarred={mail.isStarred} onMark={onMark}/>

            <MailInfoSection nameOnly={(mail.from).split('@')[0]} fullName={mail.from} formattedDate={formattedDate}/>

            <section className="mail-body">
                <p>{mail.body}</p>
            </section>
        </section>
    )
}