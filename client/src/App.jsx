import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from './config/firebase';
import {
  doc, serverTimestamp, setDoc,
  deleteDoc, getDoc, onSnapshot
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const App = () => {

  const [user, setUser] = useState('');
  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState({});

  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  // submit reg form
  const handleReg = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      console.log(res);

      await setDoc(doc(db, "users", res?.user?.uid), {
        ...user,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.error(err)
    }

  }

  // submit login form
  const handleLog = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      console.log('loging data: ', res.user);
    } catch (err) {
      console.error(err);
    }
  }

  // get all data
  const handleAllData = async () => {
    let lists = [];
    // try {
    //   const res = await getDocs(collection(db, "users"));
    //   res.forEach((doc) => {
    //     lists.push({ id: doc.id, ...doc.data() });
    //   });

    //   setAllData(lists);
    // } catch (err) {
    //   console.error(err);
    // }

    const unsub = onSnapshot(
      collection(db, "users",),
      (snapShot) => {
        snapShot.docs.forEach(doc => {
          lists.push({ id: doc.id, ...doc.data() });
        });
        setAllData(lists);

      }, (error) => {
        console.error(error);
      });

    return () => {
      unsub();
    };
  }

  // get single data
  const handleDisplay = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setSingleData({id, ...docSnap.data()})
    } else {
      console.log("No such document!");
    }
  }

  // delete a data
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
  }

  return (
    <div>
      <h1>Registration and Login</h1>
      <form >
        <input type="username" name='username' placeholder='username'
          onChange={handleChange}
        /> <br /><br />
        <input type="email" name='email' placeholder='email'
          onChange={handleChange}
        /> <br /><br />
        <input type="password" name='password'
          placeholder='password' onChange={handleChange}
        /> <br /><br />
        <input type="phone" name='phone'
          placeholder='phone' onChange={handleChange}
        /> <br /><br />
        <input type="address" name='address'
          placeholder='address' onChange={handleChange}
        /> <br /><br />
        <input type="city" name='city'
          placeholder='city' onChange={handleChange}
        /> <br /><br />

        <button onClick={handleReg}>Registration</button>
        <button onClick={handleLog}>Login</button>
      </form>

      <h1>Fetch all data</h1>
      <button onClick={handleAllData}>All Data</button>
      <br /><br />
      {
        allData.length > 0 && allData.map(data => (
          <div key={data.id}>
            <h1>{data.username}</h1>
            <h2>{data.id}</h2>
            <button onClick={() => handleDisplay(data.id)}>display</button>
            <button onClick={() => handleDelete(data.id)}>delete</button>
            <br />
            {
              singleData && (data.id === singleData.id) && (
                <div>
                  <h1>User Info</h1>
                  <p>{singleData.username}</p>
                  <p>{singleData.email}</p>
                  <p>{singleData.phone}</p>
                  <p>{singleData.address}</p>
                  <p>{singleData.city}</p>
                </div>
              )
            }
          </div>


        ))
      }
    </div>
  )
}

export default App