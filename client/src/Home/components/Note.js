import React, { Fragment, useState } from 'react';
import gapi from 'gapi-client';

import './Note.css';


function Note() {
  const [url, setUrl] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function handleCreateNotes() {
    const doc = await gapi.client.request({
      path: 'https://docs.googleapis.com/v1/documents',
      method: 'POST',
    });

    const documentId = doc.result.documentId;
    setUrl(`https://docs.google.com/document/d/${documentId}`);
  }

  async function handleSignIn() {
    await gapi.auth2.getAuthInstance().signIn();
    setIsSignedIn(true);
  }

  async function handleSignOut() {
    await gapi.auth2.getAuthInstance().signOut();
    setIsSignedIn(false);
  }

  function renderControls() {
    if (isSignedIn === false) {
      return (
        <button
          className='button te-button is-link'
          onClick={handleSignIn}
        >
          Sign In
        </button>
      );
    }

    return (
      <Fragment>
        <button
          className='button te-button is-link'
          onClick={handleCreateNotes}
        >
          Create Note
        </button>

        <button
          className='button te-button'
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </Fragment>
    );
  }

  return (
    <div className="te-note-container">
      <div className='te-controls'>
        {renderControls()}

      </div>

      <iframe className="te-embedded-note" src={url} />
    </div>
  );
}

export default Note;
