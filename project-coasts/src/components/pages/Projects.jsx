import { useLocation  } from 'react-router-dom'
import { useState, useEffect} from 'react';

import {Message} from '../layout/Message';
import {Container} from '../layout/Container';
import {LinkButton} from '../layout/LinkButton';
import {ProjectCard} from '../project/ProjectCard';

import styles from './Projects.module.css';

export function Projects(){

    const [projects, setProjects] = useState([]); // estado para salvar os projetos

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
        console.log(location)
    }

    // Para buscar todos os projetos
    // Usamos o useEffect para evitar que loop infinito de requisições

    useEffect(() => {
        fetch("http://localhost:5400/projects",{
        method: 'GET',
        headers:{
            'Content-Type':"application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setProjects(data)  
        })
        .catch((e) => console.log(err))  // assim conseguiremos debuggar depois
    },[])  // estaremos controlando um array vazio

    
    return (
       <div className={styles.project_container}>
        <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to='/newproject' text='Novo Projeto'/>
        </div>
        { message && <Message type='sucess' msg={message} />}
       <Container customClass='start'>
        { projects.length > 0 && (
            projects.map((project) => <ProjectCard 
            id={project.id}
            name={project.name}
            //budget={project.budget}
            budget={project.converted_budget}
            currency={project?.currency?.name}
            convertedBudget={project.converted_budget}
            category={project?.category?.name}
            key={project.id}
            />))}
       </Container>
       </div>
    )
}