import Nweet from "components/Nweet";
import { dbService } from "fbase";
import { addDoc, collection, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [ nweet, setNweet ] = useState("");
  const [ nweets, setNweets ] = useState([]);
  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   // const q = query(collection(dbService, "nweets"));
  //   // const dbNweets = await getDoc(q);
  //   dbNweets.forEach((doc) => {
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };

  //     setNweets(prev => [nweetObj, ...prev]);
  //   });
  // };
  useEffect(() => {
    // getNweets();

    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });

    setNweet("");
  };
  const onChange = (e) => {
    const {
      target: { value }
    } = e;

    setNweet(value);
  };

  // console.log(nweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="submit"
          value="Nweet"
        />
      </form>

      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;