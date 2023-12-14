import { utilService } from '../../../services/util.service.js'
const { useState } = React

export function MailPreview({ mail, onRemoveMail, isSent }) {
    const [isHovered, setIsHovered] = useState(false)

    const sentDate = new Date(mail.sentAt)
    let formattedSentAt
    let displayedContent

    if (isHovered) {
        displayedContent = (
            <div>
                <button className="btn" onClick={() => handleButtonClick1()}><i className="ri-delete-bin-line"></i></button>
                <button className="btn" onClick={() => handleButtonClick2()}>Button 2</button>
            </div>
        )
    } else {
        if (utilService.isSameDay(Date.now(), sentDate)) {
            formattedSentAt = utilService.getFormattedTime(sentDate)
        } else if (utilService.isSameYear(Date.now(), sentDate)) {
            formattedSentAt = utilService.getFormattedDayMpnth(sentDate)
        } else {
            formattedSentAt = utilService.getFormattedDate(sentDate)
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

    const handleButtonClick1 = () => {
        // Handle button 1 click
    }

    const handleButtonClick2 = () => {
        // Handle button 2 click
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
            {/* <span className={`mail-sentAt ${dynClassTxt}`}>{displayContent}</span> */}
            <span className={`mail-sentAt ${dynClassTxt}`}>{formattedSentAt}</span>
        </article >
    )
}
