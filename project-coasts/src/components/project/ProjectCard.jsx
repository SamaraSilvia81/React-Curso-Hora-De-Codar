import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProjectCard.module.css';

import {Link} from 'react-router-dom'

export function ProjectCard({id,currency,name,budget,price,convertedPrice, category,quantityCategory,quantityTime,time, handleRemove}){

    const currencySymbol = currency === 'BRL' ? 'R$' : '$';

    return (
       <div className={styles.project_card}>
        <h4>{name}</h4>
        <p> 
            <span>Preço:</span> {currencySymbol} { currency === "USD" ? convertedPrice : price}
        </p>
        <p>
            <span className={`${styles[currency?.toLowerCase()]}`}>Moeda:</span> {currency}
        </p>
        <p>
            <span>Orçamento Total:</span> {budget}
        </p>
        <p className={styles.category_text}>
            <span className={`${styles[time?.toLowerCase()]}`}></span> {time} - {quantityTime}
        </p>
        <p className={styles.category_text}>
            <span className={`${styles[category?.toLowerCase()]}`}></span> {category} - {quantityCategory}
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