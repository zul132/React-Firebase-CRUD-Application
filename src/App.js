import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  // create a state variable to hold the list of users
  const [users, setUsers] = useState([]);
  // create a reference to our firestore collection
  const usersCollectionRef = collection(db, 'users');

  //function to create a new user
  const createUser = async () => {
    /* addDoc() is used to add a new doc to our Firestore collection */
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  //function to update the user's age by increasing it by 1
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id); /* <-- this fetches the document that we want to update */
    const newFields = { age: age + 1 };

    /*updateDoc() will update the specified fields for the given document */
    await updateDoc(userDoc, newFields);
  };

  //function to delete a user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      /* getDocs() will return all the documents inside a specified collection */
      const data = await getDocs(usersCollectionRef);

      // Set the users state to the array of users in our collection
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []); // <-- Use an empty dependency array to run the effect only once

  return (
    <div className="App">
      <input type='text' placeholder='Enter Name' onChange={ (event) => {setNewName(event.target.value); }} /><br />
      <input type='number' placeholder='Enter Age' onChange={ (event) => {setNewAge(event.target.value); }} /><br /><br />
      <button onClick={createUser}>Create User</button>
      <hr />

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={ () => { updateUser(user.id, user.age); } }>Increment Age</button>&nbsp;&nbsp;
            <button onClick={ () => { deleteUser(user.id)} }>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
