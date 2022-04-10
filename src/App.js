import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import PhoneAuth from './components/PhoneAuth';
import ODDCal from './components/ODDCal';
import EnumeratorMonitoring from './components/EnumeratorMonitoring';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState('');

  // Whenever a Session starts, check is any user is already LoggedIn or Not
  useEffect(()=>{
    const loggedInUser = localStorage.getItem("user");
    if( loggedInUser ){
      setUser(loggedInUser);
    }
  }, []);

  // Function to make user LogOut
  const logOut = () => {
    localStorage.removeItem('user');
    window.location.reload(false);
  }

  return (
    <>
      {/* A Navigation Bar */}
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="/IIScCodingTask">IISc CiSTUP 2022 Summer Internship Program</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/IIScCodingTask/ODDistanceCalculator">O-D Distance Calculator</Nav.Link>
              <Nav.Link href="/IIScCodingTask/EnumeratorMonitoring">Enumerator Monitoring</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user ? <Button variant="outline-secondary" onClick={logOut}>Logout</Button> : <></>}
        </Container>
      </Navbar>

      {/* Conditional Rendering of Components, based on if user is LoggedIn or Not */}
      <Router>
        <Routes>
          <Route path="/" caseSensitive={false} element={ user ? <Home /> : <PhoneAuth />} />
          <Route path="/ODDistanceCalculator" caseSensitive={false} element={user ? <ODDCal /> : <PhoneAuth />} />
          <Route path="/EnumeratorMonitoring" caseSensitive={false} element={user ? <EnumeratorMonitoring /> : <PhoneAuth />} />
        </Routes>
      </Router>

      {/* Footer Bar */}
      <Navbar bg="dark" variant="dark" fixed="bottom" style={{"height": "30px"}}>
        <Container>
        <Nav className="mx-auto">
          <Nav.Link href="/">Project sponsored by <b style={{"color":"white"}}>MeitY</b></Nav.Link>
        </Nav>
        </Container>
      </