import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { BsCameraVideoFill } from "react-icons/bs"
import { IconContext } from 'react-icons/lib';
import "./navbar.css";

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener("resize", showButton);

    return (
        <>
        <IconContext.Provider value={{color: "#fff"}}>
            <div className="navbar">
                <div className="navbar-container container">
                    <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                        <BsCameraVideoFill className="navbar-icon"/>
                        MOOZ
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}    
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"} >
                        <li className="nav-item">
                            <Link to="/" className="nav-links"  onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-links"  onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li className="nav-btn">
                        </li>
                    </ul>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
