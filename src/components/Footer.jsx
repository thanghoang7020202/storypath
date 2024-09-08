import react from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Footer component for the application
 * @param {array} footerLinks - An array of footer links
 * @returns 
 */
function Footer({footerLinks}) { // footerLinks is an array of objects

    Footer.propTypes = {
        footerLinks: PropTypes.array.isRequired,
    };
    const location = useLocation();

    if (typeof footerLinks === 'undefined') {
        footerLinks = [];
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <p className="col-md-4 mb-0 text-muted">&copy; 2024 StoryPath. All rights reserved.</p>

            <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
            </a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                    
                    {footerLinks.map((link, index) => (
                        <li className="nav-item" key={index}>
                        <Link 
                            to={link.path} 
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.text}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

            </div>
        </nav>
    );
    }

export default Footer;