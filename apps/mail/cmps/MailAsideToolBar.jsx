const { useState, useEffect } = React

import { MailMenuClose } from "./MailMenuClose.jsx"
import { MailMenuOpen } from "./MailMenuOpen.jsx"

export function MailAsideToolBar({
    unreadMailsCount,
    onToggleAddMail,
    isMenuOpen,
    onChangeToInboxMails,
    onChangeToSentMails,
    onChangeToStarredMails,
    onChangeToDeletedMails,
    handleToggleMenu }) {

    const [menuOpen, setMenuOpen] = useState(isMenuOpen)
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 700)
    const [hoverTimeout, setHoverTimeout] = useState(null)

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 700)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const setIsMenuOpen = () => {
        handleToggleMenu()
    }

    // const handleToggleMenu = () => {
    //     if (isMobileView) {
    //         setMenuOpen(!menuOpen)
    //     }
    // }

    const menuProps = isMobileView
        ? {}
        : {
            onMouseEnter: () => {
                setHoverTimeout(
                    setTimeout(() => {
                        setMenuOpen(true)
                    }, 300)
                )
            },
            onMouseLeave: () => {
                clearTimeout(hoverTimeout)
                setMenuOpen(false)
            },
        }


    const mailMenuProps = {
        unreadMailsCount,
        onToggleAddMail,
        onChangeToInboxMails,
        onChangeToStarredMails,
        onChangeToSentMails,
        onChangeToDeletedMails,
        setMenuOpen,
        setIsMenuOpen,
    }

    return (
        <aside className={`mail-aside-tool-bar ${isMenuOpen ? 'open' : ''}`}
            {...menuProps}>

            {!isMenuOpen &&
                <MailMenuClose {...mailMenuProps} />
            }
            {/* {!isMenuOpen &&
                <MailMenuClose {...mailMenuProps} />
            } */}

            {isMenuOpen &&
                <MailMenuOpen {...mailMenuProps} />
            }
            {/* {isMenuOpen &&
                <MailMenuOpen {...mailMenuProps} />
            } */}

        </aside>
    )

}
