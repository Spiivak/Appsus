// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    queryNoFilter,
    get,
    remove,
    save,
    getLoggedInUser,
    getInboxMails,
    getSentMails,
    getEmptyMail,
    getFilterFromQueryString,
}

// query functions
function query(filter) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filter.isDeleted) {
                mails = mails.filter(mail => mail.removedAt !== null)
            } else {
                mails = mails.filter(mail => mail.removedAt === null)
            }

            if (filter.to) {
                mails = mails.filter(mail => mail.to === filter.to)
            } else if (filter.from) {
                mails = mails.filter(mail => mail.from === filter.from)
            }
            
            if (filter.starred) {
                mails = mails.filter(mail => mail.isStarred === true)
            }

            if (filter.filterBy.search) {
                const regex = new RegExp(filter.filterBy.search, 'i')
                mails = mails.filter(mail => (
                    regex.test(mail.subject) ||
                    regex.test(mail.from) ||
                    regex.test(mail.to) ||
                    regex.test(mail.body)
                ))
            }

            if (filter.filterBy.isRead === true) {
                mails = mails.filter(mail => mail.isRead === true)
            } else if (filter.filterBy.isRead === false) {
                mails = mails.filter(mail => mail.isRead === false)
            }

            return mails
        })
        .catch(err => console.error('err: ', err))
}

function queryNoFilter() {
    return storageService.query(MAIL_KEY)
        .then(mails => mails)
        .catch(err => console.error('err: ', err))
}

function getInboxMails({ filterBy, email }) {
    return query({ filterBy, to: email });
}

function getSentMails({ filterBy, email }) {
    return query({ filterBy, from: email });
}

// CRUD functions
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
        isStarred: false,
        from,
        to: '',
    }
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
                subject: 'Coding Rocks! Coding Rocks! Coding Rocks!',
                body: utilService.makeLorem(300),
                isRead: false,
                sentAt: 1702534778460,
                removedAt: null,
                isStarred: true,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Hello you!',
                body: utilService.makeLorem(300),
                isRead: true,
                sentAt: 1701532778460,
                removedAt: null,
                isStarred: true,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Need you help!',
                body: utilService.makeLorem(300),
                isRead: false,
                sentAt: 1701232778460,
                removedAt: null,
                isStarred: true,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                subject: 'We Rock!',
                body: utilService.makeLorem(300),
                isRead: true,
                sentAt: 1541133930594,
                removedAt: null,
                isStarred: false,
                from: 'nono@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                subject: 'We are going to have the best project!',
                body: 'Eden and Noam are going to have the best project',
                isRead: true,
                sentAt: 1701332778460,
                removedAt: null,
                isStarred: false,
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
                isStarred: false,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                subject: 'Miss you!',
                body: utilService.makeLorem(300),
                isRead: false,
                sentAt: 1701532778460,
                removedAt: null,
                isStarred: false,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e108',
                subject: 'Need you help!',
                body: utilService.makeLorem(300),
                isRead: true,
                sentAt: 1551133830594,
                removedAt: null,
                isStarred: false,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e109',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1651332778460,
                removedAt: null,
                isStarred: false,
                from: 'nono@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e110',
                subject: 'We are going to Vienna!',
                body: 'Eden and Noam are going to have the best project',
                isRead: false,
                sentAt: 1671332778460,
                removedAt: null,
                isStarred: false,
                from: 'kiki@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e111',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1681332778460,
                removedAt: null,
                isStarred: false,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e112',
                subject: 'Hello you!',
                body: utilService.makeLorem(300),
                isRead: false,
                sentAt: 1691332778460,
                removedAt: null,
                isStarred: false,
                from: 'popo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e113',
                subject: 'Need you help!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1655332778460,
                removedAt: null,
                isStarred: false,
                from: 'koko@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e114',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1657332778460,
                removedAt: null,
                isStarred: false,
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
                isStarred: false,
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
                isStarred: false,
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
                isStarred: false,
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
                isStarred: false,
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
                isStarred: false,
                from: 'kiki@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e111',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1681332778460,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'momo@momo.com'
            },
            {
                id: 'e112',
                subject: 'Hello you!',
                body: utilService.makeLorem(11),
                isRead: true,
                sentAt: 1691332778460,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'momo@momo.com'
            },
            {
                id: 'e113',
                subject: 'Need you help!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1655332778460,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'momo@momo.com'
            },
            {
                id: 'e114',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1657332778460,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'netflix@momo.com'
            },
            {
                id: 'e115',
                subject: 'We are going to have the best project!',
                body: 'Eden and Noam are going to have the best project Eden and Noam are going to have the best project',
                isRead: true,
                sentAt: 1531133230594,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'service@momo.com'
            },
            {
                id: 'e116',
                subject: 'Hello you!',
                body: 'How have you been?',
                isRead: true,
                sentAt: 1231133930594,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'help@momo.com'
            },
            {
                id: 'e117',
                subject: 'Need you help!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551123830594,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'coding@fun.com'
            },
            {
                id: 'e118',
                subject: 'We Rock!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1552133830594,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'popo@coding.com'
            },
            {
                id: 'e119s',
                subject: 'We are going to have the best project!',
                body: 'Eden and Noam are going to have the best project',
                isRead: true,
                sentAt: 1521133930594,
                removedAt: null,
                isStarred: false,
                from: 'user@appsus.com',
                to: 'kiki@koko.com'
            },
        ]
        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}