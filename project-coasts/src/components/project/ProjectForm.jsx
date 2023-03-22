import { useState, useEffect } from 'react'

import {Input} from '../form/Input'
import {Select} from '../form/Select'
import {SubmitButton} from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

 // Método para converter a moeda baseada na API
function convertCurrency(budget, exchangeRate) {
  return budget * exchangeRate;
}

export function ProjectForm({btnText, handleSubmit, projectData}){
    
    // Select das Categorias (banco de dados)
    const [categories, setCategories] = useState([])

    // Estado de todos os projetos
    const [project, setProject] = useState(projectData || {})

    // Select das moeadas (banco de dados)
    const [currencies, setCurrencies] = useState([])

    // Estado da moeda
    const [currency, setCurrency] = useState(project.currency || 'USD');

    // Estado do valor convertido
    //const [convertedBudget, setConvertedBudget] = useState(projectData ? projectData.converted_budget : null);
    const [convertedBudget, setConvertedBudget] = useState(
      project.budget / conversionRates[currency]
    );
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
      setConvertedBudget(project.budget / conversionRates[currency]);
    }, [project.budget, currency]);

    // Requisição de API para buscar as categorias
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

    const handleCurrencyChange = (event) => {
      setCurrency(event.target.value);
    };

    // Requisição de API para buscar os tipos das moedas
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

    // Método para enviar formulário
      const submit = (e) => {
        e.preventDefault();
        handleSubmit({...project, converted_budget: convertedBudget});
        console.log('Enviando os dados...');
      };

    // Método para captar as opções das categorias
    const handleCategory = (e) => {
        setProject({...project, category:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }

    // Método para captar as opções das moedas
    
    const handleCurrency = (e) => {
      const newCurrency = e.target.value;
      setCurrency(newCurrency);

      // Requisição de API para buscar a taxa de conversão entre as moedas
      fetch('https://api.exchangerate-api.com/v4/latest/BRL', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json()) // <- Adicionar este trecho de código
        .then(res => {
          // Atualiza o valor da taxa de câmbio
          const exchangeRate = res.rates[newCurrency];
          setExchangeRate(exchangeRate);

          // Calcula o valor convertido
          const tempBudget = project.budget || 0;
          const convertedBudget = convertCurrency(tempBudget, exchangeRate);
          setConvertedBudget(convertedBudget);

          // Atualiza o valor convertido
          //setConvertedBudget(convertedBudget);

        })
        .catch(error => console.log(error))

      setProject({...project, 
        currency:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
        converted_budget: convertedBudget,
      })
      }   

  // Método para captar os dados dos inputs de entrada
  const handleChange = (e) => {
    const {name,value} = e.target;
    setProject({...project,[name]:value})

     // Atualizar o valor convertido com base na nova taxa de câmbio
    if (exchangeRate) {
      const converted = convertCurrency(value, exchangeRate);
      setConvertedBudget(converted);
    }
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
                name='currency' 
                text='Selecione a moeda'
                options={currencies}
                handleOnChange={handleCurrencyChange}
                value={project.currency ? project.currency.id: ''}
           />
            <Input
                type="number"
                text="Orçamento convertido"
                name="converted_budget"
                placeholder="Orçamento convertido"
                value={convertedBudget ? convertedBudget : ''}
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