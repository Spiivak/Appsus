
const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetSearchFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetSearchFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="mail-filter grid column align-center">
            <button className="btn btn-search"><i className="fa-solid fa-search"></i></button>
            <input 
                type="search" 
                name="search" 
                id="search" 
                placeholder="Search mail" 
                value={filterByToEdit.search}
                onChange={handleChange}
            />
            <button className="btn btn-filter"><i className="fa-solid fa-sliders"></i></button>
        </section>
    )
}