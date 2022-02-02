import React, { Component } from 'react';
import { Navbar, NavLink, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { Button, Label, Input } from 'reactstrap';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {
      isNavOpen: false,
      inputval: '',
      buffer: ''
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  updateInputValue(evnt){
    const val = evnt.target.value;
    this.setState({
      buffer: val
    });
  }
  handleSubmit(){
    this.setState({
      inputval: this.state.buffer
    });
    console.log('Your input value is: ' + this.state.inputval)

  }
  onKeyDown(key){
    if(key.charCode === 13) this.handleSubmit()
  }


  render() {
    return(
    <>
      <Navbar dark expand="md">
        <div className="container justify-content-space-between justify-content-md-start">
          <NavbarBrand className="" href="/">
            <img src="img/icon.png" height="60px" width="60px" alt="Ristorante" />
          </NavbarBrand>

          <NavbarToggler onClick={this.toggleNav} />

          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
                <input className="input" id="name" type="text" placeholder="Input city or country name"
                    onInput={evnt => this.updateInputValue(evnt)}
                    onKeyPress={key => this.onKeyDown(key)}/>
                <button onClick={this.handleSubmit} className="ml-md-1"><span className="fa fa-search fas-lg"></span></button>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <div>{this.state.inputval}</div>
    </>
    );
  }
}

export default Header;
