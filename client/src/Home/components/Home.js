import React, { lazy, PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import TeLoading from '../../shared/components/Loading';
import './Home.css';


const TeBoard = lazy(() => import('./Board'));
const TeNote = lazy(() => import('./Note'));


class Home extends PureComponent {
  render() {
    const {
      translation,
      user,

      translate,
    } = this.props;

    return (
      <div className="te-home">
        <div className="te-board-wrapper">
          <Suspense fallback={<TeLoading />}>
            <TeBoard
              translation={translation}
              user={user}

              translate={translate}
            />
          </Suspense>
        </div>

        <div className="te-note-wrapper">
          <Suspense fallback={<TeLoading />}>
            <TeNote />
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
