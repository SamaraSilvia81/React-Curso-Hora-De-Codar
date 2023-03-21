import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProjectCard.module.css';

import {Link} from 'react-router-dom'

export function ProjectCard({id,currency,name,budget,convertedBudget, category,handleRemove}){

    const currencySymbol = currency === 'BRL' ? 'R$' : '$';

    return (
       <div className={styles.project_card}>
        <h4>{name}</h4>
        <p> {/*
        {currency === 'BRL' ? <span>R$</span> :  <span>$</span>} { currency === "USD" ? convertedBudget.toFixed(2) : budget}
        {currency === 'BRL' ? <span>R$ {budget}</span> : currency === 'USD' ? <span>${convertedBudget.toFixed(2)}</span> : null}
  */}
             <span>Orçamento:</span> {currencySymbol} { currency === "USD" ? convertedBudget.toFixed(2) : budget}
        </p>
        <p className={styles.category_text}>
            <span className={`${styles[category?.toLowerCase()]}`}></span> {category}
        </p>
        <p>
            <span className={`${styles[currency?.toLowerCase()]}`}></span> {currency}
        </p>
        <div className={styles.project_card_actions}>
            <Link to='/'>
                <BsPencil/> Editar
            </Link>
            <button>
                <BsFillTrashFill/> Excluir
            </button>
        </div>
       </div>
    )
}