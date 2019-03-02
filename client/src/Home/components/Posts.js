import React from 'react';


function Posts(props) {
  const {
    user,
    getUser,
  } = props;

  function onGetUser() {
    getUser({ id: '0' });
  }

  function onUpdateName() {
    const { updateName } = props;

    updateName({
      id: '0',
      name: 'random'
    });
  }

  const { name } = user;

  return (
    <div>
      <button onClick={onGetUser}>
        Get User
      </button>

      <button  onClick={onUpdateName}>
        Update Name
      </button>

      <div>name: {name}</div>
    </div>
  );
}

export default Posts;
