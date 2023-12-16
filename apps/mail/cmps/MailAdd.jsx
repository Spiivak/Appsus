import { mailService } from '../services/mail.service.js'
const { useState } = React

export function MailAdd({ onAddMail, onToggleAddMail }) {
    const emptyMail = mailService.getEmptyMail('user@appsus.com', Date.now())
    const [newMail, setNewMail] = useState(emptyMail)

    // console.log('onAddMail:', onAddMail)
    // console.log('hello:', hello)
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

    // console.log('newMail:', newMail)
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
                {/* <section className="body-section"> */}
                {/* <label htmlFor="body">Message:</label> */}
                <textarea
                    type="text"
                    id="body"
                    name="body"
                    value={newMail.body}
                    onChange={handleInputChange}
                    placeholder="Compose email"
                    required
                />
                {/* </section> */}


                <button type="submit">Send</button>
            </form >
        </section >

    )
}
