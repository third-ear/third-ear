import React, { useEffect, useState } from 'react';
import './Note.css';
import gapi from 'gapi-client';


function Note() {
  const [ src, setSrc ] = useState('');
  const [ signedIn, setSignedIn ] = useState('');

  useEffect(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });

  async function handleCreateNotes() {
    const initiallizeDoc = await gapi.client.request({
      path: 'https://docs.googleapis.com/v1/documents',
      method: 'POST',
    });

    const doc_id = initiallizeDoc.result.documentId;
    setSrc(`https://docs.google.com/document/d/${doc_id}`);
  }

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      setSignedIn(true);
    } else {
      console.log('Did not sign in successfully...')
    }
  }

  function handleAuthClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignoutClick(event) {
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
          onClick={handleSignoutClick}>
          Sign Out
        </button>
      </div>
      <iframe className="te-embedded-note" src={src} />
    </div>
  );
}


export default Note;
