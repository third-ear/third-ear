import React, { useState } from 'react';
import gapi from 'gapi-client';

import './Note.css';


function Note() {
  const [ src, setSrc ] = useState('');

  async function handleCreateNotes() {
    const doc = await gapi.client.request({
      path: 'https://docs.googleapis.com/v1/documents',
      method: 'POST',
    });

    const documentId = doc.result.documentId;
    setSrc(`https://docs.google.com/document/d/${documentId}`);
  }

  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div className="te-overview">
      <div className='buttons'>
        <button className='button'
          onClick={handleCreateNotes}
          >
          Create Note
        </button>
        <button className='button'
          onClick={handleAuthClick}>
          Authorize
        </button>
        <button className='button'
          onClick={handleSignOutClick}>
          Sign Out
        </button>
      </div>
      <iframe className="te-embedded-note" src={src} />
    </div>
  );
}


export default Note;
