import { mailService } from '../services/mail.service.js'
const { useState } = React

export function MailAdd({ onAddMail, onToggleAddMail }) {
    const emptyMail = mailService.getEmptyMail('user@appsus.com', Date.now())
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

    function handleAddMail(ev) {
        ev.preventDefault()
        onAddMail(newMail)
        setNewMail(emptyMail)
    }

    function handleCancelAdd(ev) {
        ev.preventDefault()
        onToggleAddMail()
    }

    return (
        <section className="mail-add">
            <section className="mail-add-header flex align-center space-between">
                <span className="new-mail-title">New Message</span>
                <button className="btn btn-cancel" onClick={handleCancelAdd}>X</button>
            </section>

            <form className="mail-add-form" onSubmit={handleAddMail}>
                <section className="to-section grid column">
                    <label htmlFor="to" > To:</label>
                    <input
                        type="text"
                        id="to"
                        name="to"
                        value={newMail.to}
                        onChange={handleInputChange}
                        required
                    />
                </section>

                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={newMail.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                />

                <textarea
                    type="text"
                    id="body"
                    name="body"
                    value={newMail.body}
                    onChange={handleInputChange}
                    placeholder="Compose email"
                    required
                />

                <button type="submit">Send</button>
            </form >
        </section >

    )
}
