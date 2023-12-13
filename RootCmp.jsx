const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppAsideToolBar } from "./cmps/AppAsideToolBar.jsx"
import { AppAsideNav } from "./cmps/AppAsideNav.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"

export function App() {
    const { selectedApp, setSelectedApp } = useState('home')

    function handleAppChange(app) {
        setSelectedApp(app)
    }

    return (
    <Router>
            <AppHeader onAppChange={handleAppChange}/>
            <AppAsideToolBar />
            <AppAsideNav />
            {/* <AsideActions /> */}
            {/* <AsideApps /> */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/note" element={<NoteIndex />} />
                </Routes>
            </main>
    </Router>
    )
}
