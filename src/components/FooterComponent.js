import React, {Component} from 'react';

export default class FooterComponent extends Component{
  render(){
    return(
      <>
        <div className="ftr d-flex">
          <img src="img/icon.png" height="90px" width="90px" alt="Weather" />
          <div>
            <h5>About this site</h5>
            <ul className="list-unstyled">
              <li><a target="_blank" href="https://github.com/NguyenD-Nam/React-Weather-app">GitHub repo</a></li>
              <li><a target="_blank" href="https://openweathermap.org/api">Weather Api</a></li>
            </ul>
          </div>
          <div>
            <h5>Get in touch</h5>
            <ul className="list-unstyled">
              <li><a target="_blank" href="https://github.com/NguyenD-Nam">GitHub</a></li>
              <li><a target="_blank" href="https://www.linkedin.com/in/nguyend-nam/">LinkedIn</a></li>
              <li><a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=nguyennamnade22@gmail.com">Gmail</a></li>
            </ul>
          </div>
        </div>
        <div className="subftr">
          <img src="img/icon.png" height="100px" width="100px" alt="Weather" />
        </div>
        <div className="copyright">
          &copy; 2022 Dinh Nam Nguyen
        </div>
      </>
    );
  }
}
