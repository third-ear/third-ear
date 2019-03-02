import React, { lazy, PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import MyLoading from '../../shared/components/Loading';


const MyPosts = lazy(() => import('./Posts'));


class Home extends PureComponent {
  render() {
    const {
      user,

      getUser, updateName
    } = this.props;

    return (
      <div>
        <Suspense fallback={<MyLoading />}>
          <MyPosts
            user={user}

            getUser={getUser}
            updateName={updateName}
          />
        </Suspense>
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
