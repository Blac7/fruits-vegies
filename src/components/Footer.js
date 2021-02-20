import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">Fruits & Vegies</div>
            <div className="footer-links">
                <ul>
                    <li className="footer-link">
                        <Link to=''>Terms and Privacy Notice</Link>
                    </li>
                    <li className="footer-link">
                        <Link to=''>Contact Us</Link>
                    </li>
                    <li className="footer-link">
                        <Link to=''>Help</Link>
                    </li>
                    <li className="footer-link copyright">
                        Copyrights © 2021, P3S.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
