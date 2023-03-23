import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import {Loading} from '../layout/Loading'
import {Container} from '../layout/Container'

export function Project(){

    // Hook específico para pegar parâmetros da URL
    const {id} = useParams()
    
    // State para criar projeto
    const [project, setProject] = useState([])

    // State para mostrar o nosso projeto
    const [showProjectForm, setShowProjectForm] = useState(false)

    // Chamar o projeto do id
    useEffect(()=> {
        setTimeout(() => {
            fetch(`http://localhost:5200/projects/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setProject(data)
            })
            .catch((e) => console.log(e))
        }, 310)
    },[id])

    const toggleProjectForm = () => {
        // Vamos trocar pelo estado pelo que está agora
        // É com base nesse projeto que vamos exibir os dados do formulário ou exibir os dados do projeto
        setShowProjectForm(!showProjectForm)
    }

    const currencySymbol = project.currency === 'BRL' ? 'R$' : '$';

    return(
        <>
            {project.name ? (
               <div className={styles.project_details}>
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>{project.name}</h1>
                        {/* Quando clicar ou vai para a página de editar ou de fechar */}
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {/* Se for false*/}
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Preço:</span> {currencySymbol} { project.currency === "USD" ? project.convertedPrice : project.price}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <p>detalhes do projeto</p>
                            </div>
                        )}
                    </div>
                </Container>
               </div>
            ):(
                <Loading/>
            )}
        </>
    )
}