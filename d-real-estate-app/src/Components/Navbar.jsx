import "../Styles/Navbar.scss"
import { useState } from "react"
const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <nav>
            <div className="left">
                <a href="/">
                    <img src="/logo.png" alt="logo" />
                    <span>Estate Sparks</span>
                </a>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/contact">Agents</a></li>
                </ul>
            </div>

            <div className="right">
                <button>Sign in</button>
                <button className="SignUp">Sign up</button>
                <div className="menuIcon">
                    <img onClick={() => setShowMenu((prev) => !prev)} src="/menu.png" alt="" />
                </div>
                <div className={showMenu?"menu active":"menu"}>

                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                        <a href="/contact">Agents</a>
                        <a href="/">Sign in</a>
                        <a href="/"> Sign up</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
