import { Link } from "react-router-dom";
import "../Styles/Navbar.scss"
import { useState } from "react"
const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const user = true; // Replace with actual user data
    return (
        <nav>
            <div className="left">
                <Link to="/">
                    <img src="/logo.png" alt="logo" />
                    <span>Estate Sparks</span>
                </Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/contact">Agents</Link></li>
                </ul>
            </div>

            <div className="right">
                {
                    user ?
                        (<div className="user">
                            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                            <span>Tayyab</span>
                            <Link to={"/Profile"}>
                            <div className="notification">3</div>
                               <span> Profile</span>
                            </Link>
                        </div>) : <>
                            <button>Sign in</button>
                            <button className="SignUp">Sign up</button>
                        </>
                }

                <div className="menuIcon">
                    <img onClick={() => setShowMenu((prev) => !prev)} src="/menu.png" alt="" />
                </div>
                <div className={showMenu ? "menu active" : "menu"}>

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
