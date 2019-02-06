//Importing React Lib
import React from 'react'

//Importing components from Boostrap Lib
import {Navbar, NavItem, Nav, Container} from 'react-bootstrap'

const Header = () => (
    <header className="bg-dark">
        <Navbar>
            <Container>
                <Navbar.Brand>
                    <a href="/" className="text-white">TweetHunter</a>
                </Navbar.Brand>
                <Nav className="float-right">
                    <NavItem>
                        <a href="" className="text-white">Close</a>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    </header>
);

export default Header;
