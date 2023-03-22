import { useState, useEffect } from 'react'

import {Input} from '../form/Input'
import {Select} from '../form/Select'
import {SubmitButton} from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

export function ProjectForm({btnText, handleSubmit, projectData}){
    
  // Select das Categorias (banco de dados)
  const [categories, setCategories] = useState([])

  // Select das Moedas (banco de dados)
  const [currencies, setCurrencies] = useState([])

  // Estado de todos os projetos
  const [project, setProject] = useState(projectData || {})

  // Estado da moeda
  const [currency, setCurrency] = useState("BRL");

  // Estado do valor convertido
  const [convertedBudget, setConvertedBudget] = useState(projectData ? projectData.converted_budget : null);

  // Requisição de API para buscar as categorias
  useEffect(() => {
      fetch("http://localhost:5400/categories",{
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

  // Requisição de API para buscar as moedas
  useEffect(() => {
    fetch('http://localhost:5400/currencies', {
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
      handleSubmit({ ...project, converted_budget: convertedBudget });
    console.log('Enviando os dados...');
  };

  // Método para captar os dados dos inputs de entrada - nome e orçamento
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });

    //const newConvertedBudget = convertCurrency(value, currency);
    //setConvertedBudget(newConvertedBudget);
  }

   // Metodo para captar a mudança do orçamento 
  // É um handleChange específico para 2° input
  const handleBudgetChange = (e) => {
    const budgetValue = e.target.value;
    setProject({
    ...project,
    budget: budgetValue
    });

    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    
    const newConvertedBudget = convertCurrency(budgetValue, currency);
    setConvertedBudget(newConvertedBudget);
  };

  // Metodo para captar a mudança do orçamento 
  // É um handleChange específico para 3° input
  /*const handleConvertedBudget = () => {
      // Atualizando o valor da orçamento baseado na moeda
      const newConvertedBudget = convertCurrency(project.budget, currency);
      setConvertedBudget(newConvertedBudget);
  }*/

  // Método para captar as opções das categorias
  const handleCategory = (e) => {
      setProject({...project, category:{
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

    // Método para converter os valores
    const convertCurrency = (value, currency) => {
      const conversionRate = currency === 'BRL' ? 1.0 : 5.19; // exemplo de taxa de conversão
      return parseFloat(value) * conversionRate;
    };

  // Método para captar a seleção das moedas - usado no select
  const handleCurrency = (e) => {

    // Atualizando o valor da moeda
    const newCurrency = e.target.value;
    setCurrency(newCurrency);

    // Atualizando a opção selecionada no state do projeto
    setProject({...project, currency:{
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })

    // Processo que pega a moeda, junto com o valor do orçamento e envia para a função que irá com esses dados converter e exibir no 3° input.
    const newConvertedBudget = convertCurrency(project.budget, currency);
    setConvertedBudget(newConvertedBudget);

    console.log(`budgetValeu: ${project.budget} -- currency: ${currency} -- convertedBudget: ${newConvertedBudget}`)
    //console.log(newCurrency)
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