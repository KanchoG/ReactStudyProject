import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import AddNewUser from "./components/UsersAPI/Users/AddNewUser";
import UsersList from "./components/UsersAPI/Users/UsersList";
import { db } from "./firebese-config";
import GridCard from "./components/Layout/GridCard";
import AddButon from "./components/UsersAPI/UI/AddButton";
import LoadingSpinner from "./components/UsersAPI/UI/LoadingSpinner";
import { CSSTransition } from "react-transition-group";
import "./CrudMain.css";

const CrudMain = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(props.state);
  const [addingUser, setAddingUser] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLodaing, setIsLoading] = useState(false);
  const userCollectionRef = collection(db, "users");
  const [person, setPerson] = useState({
    name: "",
    lastName: "",
    mail: "",
    number: "",
    description: "",
  });

  const getUsers = async () => {
    setIsLoading(true);
    const data = await getDocs(userCollectionRef);

    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
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
    <GridCard>
      <CSSTransition
        in={modalIsOpen}
        timeout={300}
        classNames="try"
        unmountOnExit
      >
        <AddNewUser
          onClose={closeModalHandler}
          onManageUser={addingUser ? newUserHandler : editUserHandler}
          personData={person}
          button={addingUser ? "Add" : "Edit"}
          state={modalIsOpen}
        />
      </CSSTransition>
      {!isLodaing && <AddButon onOpen={openModalHandler} />}
      <CSSTransition
        in={!isLodaing}
        timeout={300}
        classNames="trigger"
        mountOnEnter
        unmountOnExit
      >
        <UsersList
          usersData={users}
          onClose={closeModalHandler}
          onDelete={deleteUserHandler}
          onOpen={editModalHandler}
        />
      </CSSTransition>

      {isLodaing && <LoadingSpinner />}
    </GridCard>
  );
};

export default CrudMain;
