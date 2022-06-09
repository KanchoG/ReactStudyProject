import classes from "./NewJob.module.css"

const NewJob = () => {
    return <form className={classes.form} >
        <label htmlFor="department">Department</label>
        <input type="text" id="department" />
        <label htmlFor="position">Position</label>
        <input type="text" id="position" />
        <label htmlFor="salay">Salary</label>
        <input type="text" id="salary" />
        <label htmlFor="employStart">Empolyed on</label>
        <input type="text" id="employStart" />
        <label htmlFor="employEnd">Empolyed to</label>
        <input type="text" id="employEnd" />
        <button type="submit">Submit</button>
    </form>
    
}

export default NewJob