const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppAsideNav } from "./cmps/AppAsideNav.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import { MailAdd } from "./apps/mail/cmps/MailAdd.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"

export function App() {
    return (
        <Router>
            {/* <AppHeader onAppChange={handleAppChange}/> */}
            {/* <AppAsideToolBar /> */}
            {/* <AsideActions /> */}
            {/* <AsideApps /> */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/add" element={<MailAdd />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                    <Route path="/note" element={<NoteIndex />} />
                </Routes>
            </main>
            <AppAsideNav />
        </Router>
    )
}
