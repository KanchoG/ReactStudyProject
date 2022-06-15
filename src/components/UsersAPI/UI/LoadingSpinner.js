import classes from "./LoadingSpinner.module.css"
import spinner from "../../../spinner.gif"
const LoadingSpinner = () => {
    return <div className={classes.spinner}>
        <img src={spinner} />
        <p>Loading...</p>
    </div>
}

export default LoadingSpinner;