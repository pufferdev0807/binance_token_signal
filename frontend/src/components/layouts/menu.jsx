import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Image, Dropdown } from "react-bootstrap";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import Avatar from "react-avatar";
import { SIGNAL_DATA } from "../../config";


export default function Menu(props) {
  return (
    <Navbar collapseOnSelect expand="lg" className="py-3">
      <Container className="justify-content-between">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-start"
        >
          <Nav className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className=" fs-5-2 fw-semibold text-primary-1 secondary-btn"
              >
                Binance Signals
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  Object.keys(SIGNAL_DATA).map((key) => {
                    return(
                      <Dropdown.Item
                        href={SIGNAL_DATA[key].LINK}
                        key={SIGNAL_DATA[key].VALUE}
                        className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                      >
                        {SIGNAL_DATA[key].TITLE}
                      </Dropdown.Item>
                    )
                  })
                }
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className=" fs-5-2 fw-semibold text-primary-1 secondary-btn"
              >
                Binance Future Bot
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href={'/signals/binance-bot'}
                  className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                >
                  Futures BOT
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
