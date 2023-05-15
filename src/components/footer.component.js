import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <div className='footer-wrapper'>
        <div className='footer-copyright'>
          &copy; {currentYear} Plant Paradise. All Rights Reserved.
        </div>
      </div>
    );
  }
}

export default Footer;
