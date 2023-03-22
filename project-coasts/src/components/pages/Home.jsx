import { LinkButton } from '../layout/LinkButton'
import styles from './Home.module.css'
import savings from '../../img/savings.svg'

export function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Calculator</span></h1>
            <p>Comece a gerenciar os seus produtos agora mesmo!</p>
            <LinkButton to='/newproject' text='Cadastrar Produto'/>
            <img src={savings} alt='Costs'></img>
        </section>
    )
}