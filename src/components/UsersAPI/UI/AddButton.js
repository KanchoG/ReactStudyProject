import classes from "./AddButton.module.css"

const AddButon = (props) => {
    return <button onClick={props.onOpen} className={classes.button}>+</button>
}

export default AddButon;