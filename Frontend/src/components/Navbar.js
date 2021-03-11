import React, {useState, useEffect} from 'react';
import logo from "./Images/VideoIcon.png";

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
        <header>
            <img src={logo} alt="logo"/>
            <h1>MOOZ</h1>
            <nav>
                <ul className="nav_links">
                    <li><a href="index.html">Home</a></li>
                    <li><form><button formAction="gateway.html">Join</button></form></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
