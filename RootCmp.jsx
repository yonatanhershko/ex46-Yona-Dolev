import { Home } from "./pages/Home.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { Provider } = ReactRedux


import { ContactIndex } from "./pages/ContactIndex.jsx"
import { ContactDetails } from './pages/ContactDetails.jsx';
import { Home } from "./pages/Home.jsx"
import { store } from "./store/store.js"


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app-main-layout">
                    <Routes>
                        <Route path="/" element={<ContactIndex />} />

                        {/* <Route path="/user/:userId" element={<UserDetails />} /> */}

                    </Routes>
                </div>
            </Router>
        </Provider>
    )
}