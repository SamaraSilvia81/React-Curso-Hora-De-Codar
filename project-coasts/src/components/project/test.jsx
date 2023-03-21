import { useState, useEffect } from 'react'

import {Input} from '../form/Input'
import {Select} from '../form/Select'
import {SubmitButton} from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

export function ProjectForm({btnText, handleSubmit, projectData}){
    
    const [categories, setCategories] = useState([]);
    const [currencies, setCurrencies] = useState([])

    const [project, setProject] = useState(projectData || {});

    const [currency, setCurrency] = useState("BRL");
    const [convertedBudget, setConvertedBudget] = useState(
        projectData ? projectData.converted_budget : null
    )

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

    useEffect(() => {
    fetch('http://localhost:5000/currencies', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
        setCurrencies(data)
        })
        .catch((e) => console.log(e))
    }, [])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit({ ...project, converted_budget: convertedBudget });
        console.log('Enviando os dados...');
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setProject({ ...project, [name]: value })
    }

    const handleCategory = (e) => {
        setProject({...project, category:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }  

    {/*const handleCurrency = (e) => {
        const newCurrency = e.target.value
        setCurrency(newCurrency)
    
        const newConvertedBudget = convertCurrency(project.budget, newCurrency);
        setConvertedBudget(newConvertedBudget);

        setProject({...project, currency:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    } */}

    const handleCurrency = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
      
        const fromCurrency = project.currency ? project.currency.id : "BRL";
        const toCurrency = newCurrency === "BRL" ? "REAL" : "USD";
        
        const newConvertedBudget = convertCurrency(project.budget, fromCurrency, toCurrency);
        setConvertedBudget(newConvertedBudget);
      
        setProject({
          ...project,
          currency: {
            id: newCurrency,
            name: e.target.options[e.target.selectedIndex].text,
          },
        });
      };      

    const handleBudgetChange = (e) => {
        const budgetValue = e.target.value
        setProject({
          ...project,
          budget: budgetValue,
        })
    }

    const convertCurrency = (value, fromCurrency,toCurrency) => {

        const conversionRates = {
            BRL: {
              USD: 0.19, // taxa de conversão de BRL para USD
              REAL: 1.0, // taxa de conversão de BRL para REAL
            },
            USD: {
              BRL: 5.25, // taxa de conversão de USD para BRL
              REAL: 4.97, // taxa de conversão de USD para REAL
            },
            REAL: {
              BRL: 1.0, // taxa de conversão de REAL para BRL
              USD: 0.20, // taxa de conversão de REAL para USD
            },
          };

    const conversionRate = conversionRates[fromCurrency][toCurrency];
    return parseFloat(value) * conversionRate;
    };


    {/*function convertCurrency(value, currency, targetCurrency) {
        if (currency === targetCurrency) {
          // Retorna o valor original se a moeda de origem e de destino forem iguais
          return parseFloat(value);
        } else if (currency === 'BRL' && targetCurrency === 'USD') {
          // Converte de Real para Dólar
          return parseFloat(value) * 5.18;
        } else if (currency === 'USD' && targetCurrency === 'BRL') {
          // Converte de Dólar para Real
          return parseFloat(value) / 5.18;
        } else {
          // Retorna o valor original se a conversão não for suportada
          return parseFloat(value);
        }
      }  */}
      
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
                name='currency' 
                text='Selecione a moeda'
                options={currencies}
                handleOnChange={handleCurrency}
                value={project.currency ? project.currency.id: ''}
           />
           <Input
                type="number"
                text="Orçamento convertido"
                name="converted_budget"
                placeholder="Orçamento convertido"
                value={convertedBudget ? convertedBudget : ''}
                handleOnChange={handleBudgetChange}
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