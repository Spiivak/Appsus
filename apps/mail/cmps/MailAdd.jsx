import { mailService } from '../services/mail.service.js'
const { useState } = React

export function MailAdd({ onAddMail, onCancelNewMail }) {
    const emptyMail = mailService.getEmptyMail()
    const [newMail, setNewMail] = useState(emptyMail)


    const handleInputChange = (event) => {
        const field = event.target.name
        let { value } = event.target

        switch (event.target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = event.target.checked
                break

            default:
                break;
        }

        setNewMail((prevmail) => ({
            ...prevmail, [field]: value
        }))
    }

    function handleAddMail(event) {
        event.preventDefault()
        mailService.save(newMail)
            .then(() => {
                onAddMail()
                setNewMail(emptyMail)
            })
            .catch((error) => console.error('Error adding Mail:', error))
    }

    return (
        <form className="mail-edit" onSubmit={handleAddMail}>
            <label htmlFor="subject">Subject:</label>
            <input
                type="text"
                id="to"
                name="to"
                value={newMail.to}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                id="subject"
                name="subject"
                value={newMail.subject}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                id="body"
                name="body"
                value={newMail.body}
                onChange={handleInputChange}
                required
            />

            <button type="submit">Send</button>
            <button className="btn-cancel" onClick={onCancelNewMail}>X</button>
        </form>
    )
}
