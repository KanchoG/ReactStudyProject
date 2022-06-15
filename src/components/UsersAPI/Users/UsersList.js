import DeleteButton from "../UI/DeleteButton";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <div className={classes.users}>
      <ul>
        {props.usersData.length !== 0 &&
          props.usersData.map((person) => (
            <li className={classes.mainContainer} key={person.id}>
              <div
                className={classes.listContainer}
                onClick={() => {
                  props.onOpen(person);
                }}
              >
                <h1>{person.name}</h1>
                <h2>{person.lastName}</h2>
                <div className={classes.p1}>{person.mail}</div>
                <div className={classes.p2}>{person.number}</div>
                <div className={classes.p3}>{person.description}</div>
              </div>
              <DeleteButton
                onDelete={() => {
                  props.onDelete(person.id);
                }}
              />
            </li>
          ))}
        {props.usersData.length === 0 && (
          <li className={classes.mainContainer}>
            <div className={classes.listContainer}>No users found.</div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
