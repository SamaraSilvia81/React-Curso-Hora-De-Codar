import styles from "./Loading.module.css";
import loading from "../../img/loading.svg";

export function Loadind(){
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    )
}