import DeleteButton from "../UI/DeleteButton";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
    const doubleFunctHandler = () => {
      
    }
  return (
    <div className={classes.users}>
      <ul>
        {props.usersData.map((person) => (
          <div key={person.id}>
            <li
              onClick={() => {
                props.onOpen(person);
              }}
            >
              <h1>{person.name}</h1>
              <h2>{person.lastName}</h2>
              <p className={classes.p1}>{person.mail}</p>
              <p className={classes.p2}>{person.number}</p>
              <p className={classes.p3}>{person.description}</p>
            </li>
            <DeleteButton
              onDelete={() => {
                props.onDelete(person.id);
              }}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
