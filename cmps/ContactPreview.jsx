export function ContactPreview({ contact }) {
    return (
        <React.Fragment>
            <h1>{contact.fullName}</h1>
            <h2>{contact.number}</h2>
        </React.Fragment>
    )
}