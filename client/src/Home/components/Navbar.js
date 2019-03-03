import React from 'react';

import './Navbar.css';


function Navbar(props) {
  const {
    googleAuth,
    isSignedIn,

    setIsSignedIn,
  } = props;

  async function handleSignIn() {
    await googleAuth.signIn();

    setIsSignedIn(true);
  }

  async function handleSignOut() {
    await googleAuth.signOut();
    setIsSignedIn(false);
  }

  function renderControls() {
    if (isSignedIn === false) {
      return (
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-light" onClick={handleSignIn}>
              Sign in
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <div className="navbar-link">
          {photoUrl
            ? <img className="te-avatar" src={photoUrl} alt="" />
            : <span>{name}</span>}
        </div>

        <div className="navbar-dropdown is-right">
          <div className="navbar-item te-name">
            {name}
          </div>

          <hr className="navbar-divider" />
          <div
            className="navbar-item te-navbar-link"
            role="button"
            tabIndex={0}
            onClick={handleSignOut}
            onKeyPress={handleSignOut}
          >
            Sign out
          </div>
        </div>
      </div>
    );
  }
  const photoUrl = isSignedIn
    ? googleAuth.currentUser
      .get()
      .getBasicProfile()
      .getImageUrl()
    : '';

  const name = isSignedIn
    ? googleAuth.currentUser
      .get()
      .getBasicProfile()
      .getName()
    : '';

  return (
    <nav className="navbar is-light te-navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item te-logo">
          Third Ear
        </div>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
           data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          {renderControls()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
