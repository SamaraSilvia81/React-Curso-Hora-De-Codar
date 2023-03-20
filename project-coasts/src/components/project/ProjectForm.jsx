import { useState, useEffect } from 'react'

import {Input} from '../form/Input'
import {Select} from '../form/Select'
import {SubmitButton} from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

export function ProjectForm({btnText, handleSubmit, projectData}){
    
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    const [currency, setCurrency] = useState('USD');

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
        .catch((e) => console.log(e))
    },[])
    
      const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
        console.log('Enviando os dados...');
      };

      const handleChange = (e) => {
        setProject({...project,[e.target.name]: e.target.value})
        console.log(project)
    }

    const handleCategory = (e) => {
        setProject({...project, category:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }  
    
    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };
    
    const convertCurrency = (value, currency) => {
    const conversionRate = currency === 'BRL' ? 1.0 : 5.0; // exemplo de taxa de conversão
    return parseFloat(value) * conversionRate;
    };
    
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
            type='text' 
            text='Orçamento do Projeto' 
            name='budget'
            placeholder='Insira o orçamento total'
            value={project.budget ? project.budget : ''}
            handleOnChange={handleChange}
           />
          <label>
                Moeda:
                <select value={currency} onChange={handleCurrencyChange}>
                <option value="USD">Dólar</option>
                <option value="BRL">Real</option>
                </select>
            </label> 
            <Input
                type="number"
                text="Orçamento convertido"
                name="converted_budget"
                placeholder="Orçamento convertido"
                value={
                project.budget
                    ? convertCurrency(project.budget, currency).toFixed(2)
                    : ''
                }
                handleOnChange={handleChange}
                readOnly
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