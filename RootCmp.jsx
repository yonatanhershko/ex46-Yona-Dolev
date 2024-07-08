import { Home } from "./pages/Home.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM


export function App() {
    return (
        <Router>
            <div className="app-main-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>

    )
}