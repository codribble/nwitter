import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [ editing, setEditing ] = useState(false);
  const [ newNweet, setNewNweet ] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");

    if( ok ) {
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
    }
  };

  const toggleEditing = () => setEditing(prev => !prev);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNewNweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(nweetObj, newNweet);

    await updateDoc(doc(dbService, "nweets", `${nweetObj.id}`), {
      text: newNweet,
    });

    setEditing(false);
  }

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input type="text" placeholder="Edit your nweet." value={newNweet} required onChange={onChange} />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  )
};

export default Nweet;