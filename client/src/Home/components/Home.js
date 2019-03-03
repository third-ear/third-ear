import React, { lazy, PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
// import gapi from 'gapi-client';

import * as actions from '../actions';
import TeLoading from '../../shared/components/Loading';
import './Home.css';


const TeBoard = lazy(() => import('./Board'));
const TeNavbar = lazy(() => import('./Navbar'));
const TeNote = lazy(() => import('./Note'));

const gapi = window.gapi;


class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    };
  }

  onSetIsSignedIn = (isSignedIn) => {
    this.setState({ isSignedIn });
  };

  render() {
    const {
      translation,

      translate,
    } = this.props;

    const { isSignedIn } = this.state;

    const googleAuth = gapi.auth2.getAuthInstance();

    return (
      <div className="te-home">
        <Suspense fallback={<TeLoading />}>
          <TeNavbar
            googleAuth={googleAuth}
            isSignedIn={isSignedIn}

            setIsSignedIn={this.onSetIsSignedIn}
          />
        </Suspense>

        <div className="te-body">
          <div className="te-board-wrapper">
            <Suspense fallback={<TeLoading />}>
              <TeBoard
                translation={translation}

                translate={translate}
              />
            </Suspense>
          </div>

          <div className="te-note-wrapper">
            <Suspense fallback={<TeLoading />}>
              <TeNote
                isSignedIn={isSignedIn}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}


export default connect((state) => ({
  translation: state.translation,
}), {
  translate: actions.translate,
})(Home);
