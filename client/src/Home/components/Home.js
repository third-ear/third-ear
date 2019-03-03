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
      translation,
      user,

      translate,
    } = this.props;

    return (
      <div className="ty-home">
        <div className="ty-board-wrapper">
          <Suspense fallback={<TyLoading />}>
            <TyBoard
              translation={translation}
              user={user}

              translate={translate}
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
  translation: state.translation,
  user: state.user,
}), {
  translate: actions.translate,
})(Home);
