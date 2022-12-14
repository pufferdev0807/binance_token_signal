import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Image, Dropdown } from "react-bootstrap";
import { useAuth } from "../../config/AuthProvider";
import { FaUserAlt, FaSignOutAlt, FaMoneyCheckAlt, FaUserEdit, FaRegIdCard } from "react-icons/fa";
import Avatar from "react-avatar";

export default function Header() {
  const { user } = useAuth();
  const auth = useAuth();
  
  return (
    <Navbar collapseOnSelect expand="lg" className="py-3">
      <Container className="justify-content-between">
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            <Image src="/assets/images/logo.svg" width="176" alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="d-flex align-items-center">
            {user == null ? (
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between ms-3 ">
                <Link
                  to="/login"
                  className="nav-link fs-5-2 fw-semibold px-4 mx-2 text-primary-1 secondary-btn"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-link bg-primary-1 border rounded-2 text-white fs-5-2 fw-semibold px-4 mx-2 primary-btn"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className=" fs-5-2 fw-semibold text-primary-1 secondary-btn"
                >
                  {user.photo ? (
                    <Image
                      src={user.photo}
                      className="rounded-circle me-3"
                      width="30"
                    />
                  ) : (
                    <Avatar
                      name={user.firstName + " " + user.lastName}
                      size="30"
                      color={Avatar.getRandomColor("sitebase", [
                        "red",
                        "green",
                        "purple",
                        "orange",
                        "pink",
                      ])}
                      round={true}
                      className="me-3"
                    />
                  )}
                  {user.firstName + " " + user.lastName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="/profile"
                    className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                    >
                      <FaUserAlt className="me-2" />
                      Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/membership"
                    className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                    >
                      <FaMoneyCheckAlt className="me-2" />
                      Membership
                  </Dropdown.Item>

                  
                  {user.role == "ADMIN" && (
                    <div>
                      <Dropdown.Item
                        href="/admin/usermanage"
                        className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                        >
                          <FaUserEdit className="me-2" />
                          User Manage
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/admin/membershipmanage"
                        className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                        >
                          <FaRegIdCard className="me-2" />
                          Membership Manage
                      </Dropdown.Item>
                    </div>
                  )}

                  <Dropdown.Item
                    className="nav-link text-primary-1 fs-6 fw-semibold px-4 mx-3"
                    onClick={() => {
                      auth.logout();
                    }}
                    >
                      <FaSignOutAlt className="me-2" />
                      Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
