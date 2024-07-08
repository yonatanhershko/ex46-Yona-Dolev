import { ContactPreview } from "./ContactPreview.jsx"

const { Link } = ReactRouterDOM


export function ContactList({ contacts, onDeleteContact }) {
    return (
        contacts.map(contact =>
            <article className="contact-container" key={contact._id}>
                <ContactPreview contact={contact} />
                <section className="btns">
                    <button className='btn btn-details'><Link to={`/contact/${contact._id}`}>Details</Link></button>
                    <button className='btn btn-details'><Link to={`/contact/edit/${contact._id}`}>Edit</Link></button>
                    <button onClick={() => onDeleteContact(contact._id)} className="btn-delete">Delete</button>
                </section>
            </article>
        )
    )

}