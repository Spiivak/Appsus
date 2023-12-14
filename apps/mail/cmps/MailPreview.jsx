import { utilService } from '../../../services/util.service.js'
const { useState } = React

export function MailPreview({ mail, onRemoveMail, isSent, onMarkRead }) {
    const [isHovered, setIsHovered] = useState(false)

    const sentDate = new Date(mail.sentAt)
    // let formattedSentAt
    let displayedContent

    if (isHovered) {
        displayedContent = (
            <div className="actions-container">
                <button 
                    className="btn"
                    onClick={onDeleteBtn}
                    >
                    <i className=" ri-delete-bin-line"></i>
                </button>
                <button 
                    className="btn"
                    onClick={onMarkReadBtn}
                    >
                    <i className=" fa-solid fa-envelope-circle-check"></i>
                </button>

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

    const dynClassTxt = (!mail.isRead) ? 'un-read-txt' : ''
    const dynClassBgc = (!mail.isRead) ? 'un-read-bgc' : ''

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    function onDeleteBtn(ev)  {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    function onMarkReadBtn(ev)  {
        ev.stopPropagation()
        onMarkRead(mail.id)
    }

    return (
        <article
            className={`mail-preview ${dynClassBgc}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="btn btn-starred"><i className="fa-regular fa-star"></i></button>
            {!isSent &&
                <span className={`mail-from ${dynClassTxt}`}>
                    {mail.from}
                </span>
            }
            {isSent &&
                <span className="mail-from">{`To: ${mail.to}`}</span>
            }
            <section>
                <span className={`mail-subject ${dynClassTxt}`}>
                    {`${mail.subject} `}
                </span>
                <span className="mail-body">{mail.body}</span>
            </section>
            <span className={`mail-sentAt ${dynClassTxt}`}>{displayedContent}</span>
            {/* <span className={`mail-sentAt ${dynClassTxt}`}>{formattedSentAt}</span> */}
        </article >
    )
}
