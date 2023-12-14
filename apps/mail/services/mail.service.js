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
            if (filterBy.to) {
                mails = mails.filter(mail => mail.to === filterBy.to)
            } else if (filterBy.from) {
                mails = mails.filter(mail => mail.from === filterBy.from)
            }

            if (filterBy.filterBy.search) {
                const regex = new RegExp(filterBy.filterBy.search, 'i')
                mails = mails.filter(mail => (
                    regex.test(mail.subject) ||
                    regex.test(mail.from) ||
                    regex.test(mail.to) ||
                    regex.test(mail.body)
                ))
            }

            if (filterBy.isRead !== undefined) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            return mails
        })
}

function getInboxMails({ filterBy, email }) {
    return query({ filterBy, to: email });
}

function getSentMails({ filterBy, email }) {
    return query({ filterBy, from: email });
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
    return { search: '', isRead: false }
}

function getFilterFromQueryString(searchParams) {
    const search = searchParams.get('search') || ''
    const isRead = searchParams.get('isRead') || ''

    return { search, isRead }
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
                subject: 'Coding Rocks!',
                body: utilService.makeLorem(10),
                isRead: false,
                sentAt: 1702534778460,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Hello you!',
                body: utilService.makeLorem(10),
                isRead: true,
                sentAt: 1701532778460,
                removedAt: null,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Need you help!',
                body: utilService.makeLorem(10),
                isRead: false,
                sentAt: 1551133830594,
                removedAt: null,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                subject: 'We Rock!',
                body: utilService.makeLorem(10),
                isRead: true,
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
            {
                id: 'e106',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1702534778460,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                subject: 'Miss you!',
                body: utilService.makeLorem(6),
                isRead: false,
                sentAt: 1701532778460,
                removedAt: null,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e108',
                subject: 'Need you help!',
                body: utilService.makeLorem(6),
                isRead: true,
                sentAt: 1551133830594,
                removedAt: null,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e109',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1541133930594,
                removedAt: null,
                from: 'nono@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e110',
                subject: 'We are going to Vienna!',
                body: 'Eden and Noam are going to have the best project',
                isRead: false,
                sentAt: 1531133930594,
                removedAt: null,
                from: 'kiki@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e111',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1702534778460,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e112',
                subject: 'Hello you!',
                body: utilService.makeLorem(11),
                isRead: false,
                sentAt: 1701532778460,
                removedAt: null,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e113',
                subject: 'Need you help!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551233830594,
                removedAt: null,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e114',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1521133930594,
                removedAt: null,
                from: 'nono@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e115',
                subject: 'We are going to have the best project!',
                body: 'Eden and Noam are going to have the best project Eden and Noam are going to have the best project',
                isRead: true,
                sentAt: 1531133230594,
                removedAt: null,
                from: 'kiki@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e116',
                subject: 'Hello you!',
                body: 'How have you been?',
                isRead: false,
                sentAt: 1231133930594,
                removedAt: null,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e117',
                subject: 'Need you help!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551123830594,
                removedAt: null,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e118',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1552133830594,
                removedAt: null,
                from: 'nono@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e119s',
                subject: 'We are going to have the best project!',
                body: 'Eden and Noam are going to have the best project',
                isRead: false,
                sentAt: 1521133930594,
                removedAt: null,
                from: 'kiki@momo.com',
                to: 'user@appsus.com'
            },
        ]
        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}