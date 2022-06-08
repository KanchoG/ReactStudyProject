import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import AddNewUser from "./components/Users/AddNewUser";
import UsersList from "./components/Users/UsersList";
import { db } from "./firebese-config";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addingUser, setAddingUser] = useState(true);
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  const [person, setPerson] = useState({
    name: "",
    lastName: "",
    mail: "",
    number: "",
    description: "",
  });


  // const userDoc = doc(db, "users", "ofeglPRFhU5wqPNWKAmO");
  // const test = async () => {
  //   const data = await getDoc(userDoc);
  //   console.log(data.data());
  // }

  // test();
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);

    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);

  const newUserHandler = async (data) => {
    await addDoc(userCollectionRef, {
      name: data.name,
      lastName: data.lastName,
      mail: data.mail,
      number: data.number,
      description: data.description,
    });

    getUsers();
  };

  const deleteUserHandler = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
  const openModalHandler = () => {
    setModalIsOpen(true);
    setAddingUser(true);
    setPerson({
      name: "",
      lastName: "",
      mail: "",
      number: "",
      description: "",
    });
  };
  const editModalHandler = (person) => {
    setPerson(person);
    setModalIsOpen(true);
    setAddingUser(false);
  };
  const editUserHandler = async (data) => {
    const userDoc = doc(db, "users", person.id);
    const updatedUser = {
      name: data.name,
      lastName: data.lastName,
      mail: data.mail,
      number: data.number,
      description: data.description,
    };
    await updateDoc(userDoc, updatedUser);
    getUsers();
  };

  return (
    <Fragment>
      <Header onOpenModal={openModalHandler} />
      {modalIsOpen && addingUser && (
        <AddNewUser
          onClose={closeModalHandler}
          onManageUser={newUserHandler}
          personData={person}
          button="Add"
        />
      )}
      {modalIsOpen && !addingUser && (
        <AddNewUser
          onClose={closeModalHandler}
          onManageUser={editUserHandler}
          personData={person}
          button="Edit"
        />
      )}
      <UsersList
        usersData={users}
        onClose={closeModalHandler}
        onDelete={deleteUserHandler}
        onOpen={editModalHandler}
      />
    </Fragment>
  );
}

export default App;
