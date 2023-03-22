import { useLocation  } from 'react-router-dom'
import { useState, useEffect} from 'react';

import {Message} from '../layout/Message';
import {Container} from '../layout/Container';
import {Loadind} from '../layout/Loading';
import {LinkButton} from '../layout/LinkButton';
import {ProjectCard} from '../project/ProjectCard';

import styles from './Projects.module.css';

export function Projects(){

    const [projects, setProjects] = useState([]); // estado para salvar os projetos
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
        console.log(location)
    }

    // Para buscar todos os projetos
    // Usamos o useEffect para evitar que loop infinito de requisições

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5200/projects",{
                method: 'GET',
                headers:{
                    'Content-Type':"application/json"
                }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setProjects(data) 
                setRemoveLoading(true) // quando os projetos forem carregados, então ele se remove
            })
            .catch((e) => console.log(e))  // assim conseguiremos debuggar depois
        }, 400)
    },[])  // estaremos controlando um array vazio

    return (
       <div className={styles.project_container}>
        <div className={styles.title_container}>
            <h1>Meus Produtos</h1>
            <LinkButton to='/newproject' text='Novo Produto'/>
        </div>
        { message && <Message type='sucess' msg={message} />}
       <Container customClass='start'>
        { projects.length > 0 && (
            projects.map((project) => <ProjectCard
                key={project.id} 
                id={project.id}
                name={project.name}
                budget={project.budgetTotal}
                time={project?.time?.name}
                quantityTime={project.quantityTime}
                quantityCategory={project.quantityCategory}
                price={project.converted_price}
                convertedPrice={project.converted_price}
                currency={project?.currency?.name}
                category={project?.category?.name}
            />))}
            {/*If que representa quando os projetos não estão sendo carregados*/}
            {!removeLoading && <Loadind/>}
            {/*If quando não existe nenhum projeto*/}
            {removeLoading && projects.length === 0(
                <p>Não há projetos cadastrados!</p>
            )
            }
       </Container>
       </div>
    )
}