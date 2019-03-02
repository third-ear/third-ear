import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


class Note extends PureComponent {
  render() {
    return (
      <div>
        Note
      </div>
    );
  }
}


export default connect((state) => ({
  user: state.user
}), {

})(Note);
