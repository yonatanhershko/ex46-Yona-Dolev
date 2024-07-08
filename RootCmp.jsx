const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { Provider } = ReactRedux


import { ContactIndex } from "./pages/ContactIndex.jsx"
import { ContactDetails } from './pages/ContactDetails.jsx'
import { ContactEdit } from './pages/ContactEdit.jsx'
import { Home } from "./pages/Home.jsx"
import { store } from "./store/store.js"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app-main-layout">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<ContactIndex />} />
                        <Route path="/contact/edit/:contactId" element={<ContactEdit />} />
                        <Route path="/contact/:contactId" element={<ContactDetails />} />

                    </Routes>
                </div>
                <AppFooter />
            </Router>
        </Provider>
    )
}