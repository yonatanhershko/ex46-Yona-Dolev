import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function Filter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { name, number } = filterByToEdit

    return (
        <section className="contact-filter">
            <h2>Filter</h2>
            <input type="text"
                id="name"
                name="txt"
                value={name}
                placeholder="By name"
                onChange={handleChange}
            />
            <input type="text"
                id="number"
                name="number"
                value={number}
                placeholder="By number"
                onChange={handleChange}
            />
        </section>
    )
}