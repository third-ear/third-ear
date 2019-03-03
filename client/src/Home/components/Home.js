import React, { lazy, PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import TyLoading from '../../shared/components/Loading';
import './Home.css';


const TyBoard = lazy(() => import('./Board'));
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
        <div className="ty-board-wrapper">
          <Suspense fallback={<TyLoading />}>
            <TyBoard
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
