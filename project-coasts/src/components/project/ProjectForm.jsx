import { useState, useEffect } from 'react'

import {Input} from '../form/Input'
import {Select} from '../form/Select'
import {SubmitButton} from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

export function ProjectForm({btnText, handleSubmit, projectData}){
    
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    // Conversão de Moeda
    const [currency, setCurrency] = useState("BRL");
    const [convertedBudget, setConvertedBudget] = useState(projectData ? projectData.converted_budget : null);

    const [originalBudget, setOriginalBudget] = useState(
      projectData ? projectData.budget : null
    );
    const [currencies, setCurrencies] = useState([])

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
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
        const newConvertedBudget = convertCurrency(project.budget, currency);
        setConvertedBudget(newConvertedBudget);
        console.log(project)
        }

   {/* const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
        if (name === 'budget') {
          const newConvertedBudget = convertCurrency(value, currency);
          setConvertedBudget(newConvertedBudget);
          console.log(project, newConvertedBudget)
        }
      };*/}

    const handleCategory = (e) => {
        setProject({...project, category:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }  

    const handleCurrency = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);

        {/*const fromCurrency = project.currency ? project.currency.id : "BRL";
        const toCurrency = newCurrency === "BRL" ? "REAL" : "USD";
        let newConvertedBudget = convertedBudget;

        if (fromCurrency === "USD" && newCurrency === "BRL") {
          newConvertedBudget = convertedBudget / 5.25;
        } else if (fromCurrency === "BRL" && newCurrency === "USD") {
          newConvertedBudget = convertedBudget * 5.25;
        }

        setConvertedBudget(newConvertedBudget);

        setProject({
          ...project,
          currency: {
            id: newCurrency,
            name: e.target.options[e.target.selectedIndex].text,
          },
        });*/}
      
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

        if (newCurrency !== fromCurrency) {
          const originalBudgetValue = convertToOriginalCurrency(
            convertedBudget,
            newCurrency,
            fromCurrency
          );
          setOriginalBudget(originalBudgetValue);
      };     
    } 

    const handleBudgetChange = (e) => {
        const budgetValue = e.target.value;
        setProject({
        ...project,
        budget: budgetValue
        });
        const newConvertedBudget = convertCurrency(budgetValue, currency);
        setConvertedBudget(newConvertedBudget);
    };
    
    const handleCurrencyChange = (e) => {
      const newCurrency = e.target.value;
      setCurrency(newCurrency);
      const newConvertedBudget = currency === "USD" && newCurrency === "BRL" ?
      convertedBudget * 5.18 : currency === "BRL" && newCurrency === "USD" ?
      convertedBudget / 5.18 : convertedBudget;
      setConvertedBudget(newConvertedBudget);
    };
    
    const convertCurrency = (value, currency) => {
      const conversionRate = currency === 'BRL' ? 1.0 : 5.18; // exemplo de taxa de conversão
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
            type='number' 
            text='Orçamento do Projeto' 
            name='budget'
            placeholder='Insira o orçamento total'
            value={project.budget ? project.budget : ''}
            handleOnChange={handleChange}
           />
          <label>
                Moeda:
                <select value={currency} onChange={handleCurrencyChange}>
                    <option value="BRL">Real</option>
                    <option value="USD">Dólar</option>
                </select>
            </label> 
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
                /*value={
                project.budget
                    ? convertCurrency(project.budget, currency).toFixed(2)
                    : ''
                }*/
                handleOnChange={handleBudgetChange}
                //disabled={true}
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