import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; // still requesting the status from the server
      case false:
        return (
          <li>
            <a href="/auth/google">Login using Google</a>
          </li>
        );

      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Campaign
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
// function mapStateToProps(state){
//   return {auth: state.auth}
// }
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps, null)(Header);
