import { useState, useEffect } from 'react'

import {Input} from '../form/Input'
import {Select} from '../form/Select'
import {SubmitButton} from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

export function ProjectForm({btnText, handleSubmit, projectData}){
    
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories",{
        method: 'GET',
        headers:{
            'Content-Type':"application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((e) => console.log(err))
    },[])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
        console.log('Enviando os dados...')
        //console.log(project)
    }

    const handleChange = (e) => {
        setProject({...project,[e.target.name]: e.target.value})
        //console.log(project)
    }

    const handleCategory = (e) => {
        setProject({...project, category:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
           <Input 
            type='text' 
            text='Nome do Projeto' 
            name='name'
            placeholder='Insira o nome do projeto'
            value={project.name ? project.name : ''}
            handleOnChange={handleChange}
           />
           <Input 
            type='number' 
            text='Orçamento do Projeto' 
            name='budget'
            placeholder='Insira o orçamento total'
            value={project.budget ? project.budget : ''}
            handleOnChange={handleChange}
           />
           <Select 
            name='category_id' 
            text='Selecione a categoria'
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id: ''}
           />
           <SubmitButton text={btnText} handleSubmit={handleSubmit}/>
        </form>
    )
}