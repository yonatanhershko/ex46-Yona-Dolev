const { Link } = ReactRouterDOM


export function ContactList({ contacts, onDeleteContact }) {
    return (
        contacts.map(contact =>
            <article className="contact-container" key={contact._id}>
                <h1>{contact.fullName}</h1>
                <h2>{contact.number}</h2>
                <section className="btns">
                    <button className='btn btn-details'><Link to={`/contact/${contact._id}`}>Details</Link></button>
                    <button className="btn-edit">Edit</button>
                    <button onClick={() => onDeleteContact(contact._id)} className="btn-delete">Delete</button>
                </section>
            </article>
        )
    )

}