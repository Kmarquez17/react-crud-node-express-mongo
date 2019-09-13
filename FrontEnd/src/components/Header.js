import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">React CRUD & Routing</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/producto/agregar" className="nav-link">
              Agregar Producto
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/productos/listado" className="nav-link">
              Productos
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
