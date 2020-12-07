import React from 'react';
import { Nav } from 'react-bootstrap';

const Navbar = () => (
  <Nav
    onSelect={(selectedKey) => { console.log(`selected ${selectedKey}`) }}
  >
    <Nav.Item>
      <Nav.Link href="/home">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/users">Users</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default Navbar;