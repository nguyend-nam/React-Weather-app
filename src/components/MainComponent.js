import React, { Component } from 'react';
import { Navbar, NavLink, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { Button, Label, Input } from 'reactstrap';
import Forecast from './ForecastComponent';
import Footer from './FooterComponent';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      isNavOpen: false,
      inputval: '',
      buffer: '',
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
    console.log('Your input value is: ' + this.state.buffer);
  }
  onKeyDown(key){
    if(key.charCode === 13) this.handleSubmit();
  }


  render() {
    return(
    <>
      <Navbar dark expand="md">
        <div className="container justify-content-space-between justify-content-md-start">
          <NavbarBrand className="" href="/">
            <img src="img/icon.png" height="60px" width="60px" alt="Weather" />
          </NavbarBrand>

          <NavbarToggler onClick={this.toggleNav} />

          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
                <input className="input" id="name" type="text" placeholder="Input country or city name"
                    onInput={evnt => this.updateInputValue(evnt)}
                    onKeyPress={key => this.onKeyDown(key)}/>
                <button onClick={this.handleSubmit} className="ml-md-1"><i class="fas fa-search"></i></button>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <div>
        <Forecast name={this.state.inputval} />
      </div>
      <Footer />
    </>
    );
  }
}

export default Header;
