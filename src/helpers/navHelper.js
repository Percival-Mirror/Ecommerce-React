import { useState } from "react"

export const navHelper = () => {

    const [show, setShow] = useState(false)
    const [menuShow, setMenuShow] = useState('hidden')

    const showMenu = () => {
        if (menuShow === 'hidden') {
            setMenuShow('shown')
            setShow(true)
            document.body.style.overflow = 'hidden'
        } else {
            setMenuShow('hidden')
            setShow(false)
            document.body.style.overflow = 'unset'
        }
    }

    return{
        show,
        menuShow,
        showMenu,
    }
}
