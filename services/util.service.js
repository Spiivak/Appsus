export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getFormattedDate,
    getFormattedTime,
    getFormattedDayMpnth,
    isSameDay,
    isSameYear,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

// function makeLorem(size = 100, wordsPerParagraph = 20) {
//     var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
//     var txt = '';
//     var paragraphs = Math.ceil(size / wordsPerParagraph);

//     for (let i = 0; i < paragraphs; i++) {
//         for (let j = 0; j < wordsPerParagraph && size > 0; j++) {
//             size--;
//             txt += words[Math.floor(Math.random() * words.length)] + ' ';
//         }
//         txt += '\n\n'; // Add double line breaks between paragraphs
//     }

//     return txt; // Remove trailing spaces
// }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getFormattedDate(timestamp) {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
    return dateFormatter.format(timestamp)
}

function getFormattedTime(timestamp) {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric' })
    return dateFormatter.format(timestamp)
}

function getFormattedDayMpnth(timestamp) {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' })
    return dateFormatter.format(timestamp)
}

function isSameDay(date1, date2) {
    const date1Date = new Date(date1)
    const date2Date = new Date(date2)
    return (
        date1Date.getFullYear() === date2Date.getFullYear() &&
        date1Date.getMonth() === date2Date.getMonth() &&
        date1Date.getDate() === date2Date.getDate()
    )
}

function isSameYear(date1, date2) {
    const date1Date = new Date(date1)
    const date2Date = new Date(date2)

    return date1Date.getFullYear() === date2Date.getFullYear()
}


// getFormattedDate(new Date())