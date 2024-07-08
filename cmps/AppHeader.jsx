const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="header-container">
            <h2>Contacts</h2>
            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/contact">Contacts</NavLink>
            </nav>
        </header>
    )
}