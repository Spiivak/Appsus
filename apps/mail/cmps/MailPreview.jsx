import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onRemoveMail, isSent }) {

    const sentDate = new Date(mail.sentAt)
    let formattedSentAt

    if (utilService.isSameDay(Date.now(), sentDate)) {
        formattedSentAt = utilService.getFormattedTime(sentDate)
    } else if (utilService.isSameYear(Date.now(), sentDate)) {
        formattedSentAt = utilService.getFormattedDayMpnth(sentDate)
    } else {
        formattedSentAt = utilService.getFormattedDate(sentDate)
    }

    const dynClassTxt = (!mail.isRead) ? 'un-read-txt' : ''
    const dynClassBgc = (!mail.isRead) ? 'un-read-bgc' : ''

    return (
        <article className={`mail-preview ${dynClassBgc}`}>
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
            <span className={`mail-sentAt ${dynClassTxt}`}>{formattedSentAt}</span>
        </article >
    )
}
