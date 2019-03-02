import React, { lazy, PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import TyLoading from '../../shared/components/Loading';
import './Home.css';


const TySubtitle = lazy(() => import('./Subtitle'));
const TyNote = lazy(() => import('./Note'));


class Home extends PureComponent {
  render() {
    const {
      user,

      getUser,
      updateName,
    } = this.props;

    return (
      <div className="ty-home">
        <div className="ty-subtitle-wrapper">
          <Suspense fallback={<TyLoading />}>
            <TySubtitle
              user={user}

              getUser={getUser}
              updateName={updateName}
            />
          </Suspense>
        </div>

        <div className="ty-note-wrapper">
          <Suspense fallback={<TyLoading />}>
            <TyNote />
          </Suspense>
        </div>
      </div>
    );
  }
}


export default connect((state) => ({
  user: state.user
}), {
  getUser: actions.getUser,
  updateName: actions.updateName,
})(Home);
