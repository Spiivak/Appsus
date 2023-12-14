
const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
    // console.log('filterBy:', filterBy)
    const [isActive, setIsActive] = useState(false)
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    // function onSetFilterBy() {
    //     onSetFilter(filterByToEdit)
    // }

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
        // console.log('filterByToEdit:', filterByToEdit)
    }

    function onAddActive() {
        setIsActive(true)
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
                onClick={onAddActive}
            />
            <button className="btn btn-filter"><i className="fa-solid fa-sliders"></i></button>
        </section>
    )
}