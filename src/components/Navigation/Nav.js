import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function Nav() {
  const Nav = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 10vh;
    background: lightblue;
    color: white;
  `;

  const Navlinks = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
  `;

  const navStyle = { color: "white" };

  return (
    <Nav>
      <Link to="/">
        <h3>Logo</h3>
      </Link>
      <Navlinks>
        <Link style={navStyle} to="/register">
          <li>Register</li>
        </Link>
        <Link style={navStyle} to="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link style={navStyle} to="/admin">
          <li>Admin Only</li>
        </Link>
      </Navlinks>
    </Nav>
  );
}

export default Nav;
