import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 * Header component for the application
 * @param {string} brandText - The brand text for the header
 * @param {array} navLinks - An array of navigation links
 * @returns 
 */
function Header({ brandText, headerLinks }) {

Header.propTypes = {
    brandText: PropTypes.string.isRequired,
    headerLinks: PropTypes.array.isRequired
    };
  const location = useLocation();

  if (typeof headerLinks === 'undefined') {
    headerLinks = [];
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link to="/" className="navbar-brand">{brandText}</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsable nav links */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                
                {headerLinks.map((link, index) => (
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

export default Header;
// rewrite the header component ing react-bootstrap

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// /**
//  * Header component for the application
//  */
// /**
//  * Header component for the application
//  * @param {string} brandText - The brand text for the header
//  * @param {array} navLinks - An array of navigation links
//  * @returns 
//  */
// function Header({ brandText, navLinks }) {

//     Header.propTypes = {
//         brandText: PropTypes.string.isRequired,
//         navLinks: PropTypes.array.isRequired,
//         };
//       const location = useLocation();
    
//       if (typeof navLinks === 'undefined') {
//         navLinks = [];
//       }
    
//       return (
//         <Navbar expand="lg" className="bg-body-tertiary">
//         <Container>
//             <Navbar.Brand as={Link} to="/">{brandText}</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
            
//             <Nav className="me-auto">
//                 { // add all files in the navLinks array
//                 navLinks.map((link, index) => (
//                         <Nav.Link 
//                             key={index}
//                             as={Link}
//                             to={link.path}
//                             className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
//                         >
//                             {link.text}
//                         </Nav.Link>
//                     ))}
                
//                 <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//                     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//                 </NavDropdown>
//             </Nav>
//             </Navbar.Collapse>
//         </Container>
//         </Navbar>
//         );
//     }
    
//     export default Header;
