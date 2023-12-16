import { utilService } from '../../../services/util.service.js'
const { useState, useEffect } = React

export function MailPreview({ mail, onRemoveMail, showSentMails, onMark }) {
    const bgColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#673AB7']
    const [isHovered, setIsHovered] = useState(false)
    const [isStarred, setIsStarred] = useState(mail.isStarred ? true : false)
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 700)

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 700)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const sentDate = new Date(mail.sentAt)
    const isRead = mail.isRead
    let displayedContent

    if (isHovered && !isMobileView) {
        displayedContent = (
            <div className="actions-container flex align-center">
                <button className="btn" onClick={onDeleteMail} >
                    <i className=" ri-delete-bin-line"></i>
                </button>
                {isRead &&
                    <button className="btn" onClick={onChangeReadMark}>
                        <i className="ri-mail-unread-line"></i>
                    </button>
                }
                {!isRead &&
                    <button className="btn" onClick={onChangeReadMark}>
                        <i className="ri-mail-open-line"></i>
                    </button>
                }
            </div>
        )
    } else {
        if (utilService.isSameDay(Date.now(), sentDate)) {
            displayedContent = utilService.getFormattedTime(sentDate)
        } else if (utilService.isSameYear(Date.now(), sentDate)) {
            displayedContent = utilService.getFormattedDayMpnth(sentDate)
        } else {
            displayedContent = utilService.getFormattedDate(sentDate)
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    function onDeleteMail(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    function onChangeReadMark(ev) {
        ev.stopPropagation()
        onMark(mail.id, 'isRead')
    }

    function onStarClick(ev) {
        ev.stopPropagation()
        setIsStarred((prevIsStarred) => !prevIsStarred)
        onMark(mail.id, 'isStarred')
    }

    const dynClassTxt = (!mail.isRead) ? 'un-read-txt' : ''
    const dynClassBgc = (!mail.isRead) ? 'un-read-bgc' : ''

    return (
        <article
            className={`mail-preview ${dynClassBgc}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <div
                className="mail-logo"
                style={{ backgroundColor: bgColors[utilService.getRandomInt(0, 5)] }}
            >
                {mail.from[0].toUpperCase()}
            </div>

            <button className={`btn btn-starred ${isStarred ? 'starred' : ''}`} onClick={(onStarClick)}>
                <i className="fa-regular fa-star"></i>
            </button>

            {!showSentMails &&
                <span className={`mail-from ${dynClassTxt}`}>
                    {mail.from}
                </span>
            }
            {showSentMails &&
                <span className="mail-from">
                    {`To: ${mail.to}`}
                </span>
            }

            <section className="mail-content">
                <p className={`mail-subject ${dynClassTxt}`}>
                    {`${mail.subject} `}
                </p>
                <p className="mail-body">{mail.body}</p>
            </section>

            <span className={`mail-sentAt ${dynClassTxt}`}>{displayedContent}</span>
        </article >
    )
}
