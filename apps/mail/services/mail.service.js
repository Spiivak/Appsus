// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getLoggedInUser,
    getInboxMails,
    getSentMails,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromQueryString,
}

function query(filterBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy && filterBy.to) {
                mails = mails.filter(mail => mail.to === filterBy.to)
            } else if (filterBy && filterBy.from) {
                mails = mails.filter(mail => mail.from === filterBy.from)
            }

            if (filterBy && filterBy.subject) {
                const regex = new RegExp(filterBy.subject, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }

            if (filterBy && filterBy.isRead !== undefined) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            return mails
        })
}

function getInboxMails(email) {
    return query({ to: email });
}

function getSentMails(email) {
    return query({ from: email });
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(from = '', sentAt = null) {
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt,
        removedAt: null,
        from,
        to: '',
    }
}

function getDefaultFilter() {
    return { subject: '', isRead: false }
}

function getFilterFromQueryString(searchParams) {
    const subject = searchParams.get('subject') || ''
    const isRead = searchParams.get('isRead') || ''

    return { subject, isRead }
}

function getLoggedInUser() {
    return {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
}

function _createMails() {
    let mails = localStorageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        const mails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1702534778460,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Hello you!',
                body: 'How have you been?',
                isRead: false,
                sentAt: 1701532778460,
                removedAt: null,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Need you help!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551133830594,
                removedAt: null,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1541133930594,
                removedAt: null,
                from: 'nono@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                subject: 'We are going to have the best project!',
                body: 'Eden and Noam are going to have the best project',
                isRead: true,
                sentAt: 1531133930594,
                removedAt: null,
                from: 'kiki@momo.com',
                to: 'user@appsus.com'
            },
        ]
        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}