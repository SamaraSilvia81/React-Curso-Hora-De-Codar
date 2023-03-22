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
  
  // Select do Tempo (banco de dados)
  const [times, setTimes] = useState([] || [2])

  // Estado de todos os projetos
  // const [project, setProject] = useState(projectData || {})
  const [project, setProject] = useState(projectData || {
    name: '',
    budget: '',
    currency: {
      id: '',
      name: '',
    },
    converted_budget: null,
    qtde: 0,
    products: [], // novo campo para armazenar os produtos
  });

  // Estado da moeda
  const [currency, setCurrency] = useState("BRL");

  // Estado do valor convertido
  const [convertedPrice, setConvertedPrice] = useState(projectData ? projectData.converted_price : null);

  // Estado do orçamento total
  const [budget, setBudget] = useState();

  // Requisição de API para buscar as categorias
  useEffect(() => {
      fetch("http://localhost:5200/categories",{
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
    fetch('http://localhost:5200/currencies', {
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

  // Requisição de API para buscar o período
  useEffect(() => {
    fetch('http://localhost:5200/time', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
      .then((res) => res.json())
      .then((data) => {
        setTimes(data)
      })
      .catch((e) => console.log(e))
    }, [])

  const budgetTotal = (quantityTime, quantityCategory) => {
    let total = quantityTime * quantityCategory;
    setBudget(total);
    console.log("total:", total);
  };

  // Método para enviar formulário
  const submit = (e) => {
    e.preventDefault();
      handleSubmit({ 
        ...project, 
        converted_price: convertedPrice,
        budgetTotal: budget});
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

    // Método para captar as opções do período de tempo
    const handleTime = (e) => {
      setProject({...project, time:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }
  
  // Método para captar os dados dos inputs de entrada - nome e orçamento
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  }

  // Método para converter os valores
  const convertCurrency = (value, currency) => {
    const conversionRate = currency === 'BRL' ? 1.0 : 5.25; // exemplo de taxa de conversão
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
    const newConvertedPrice = convertCurrency(project.price, currency);
    setConvertedPrice(newConvertedPrice);

    console.log(`priceValeu: ${project.price} -- currency: ${currency} -- convertedprice: ${newConvertedPrice}`)
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
          text='Preço do Produto' 
          name='price'
          placeholder='Insira o preço do produto'
          value={project.price ? project.price : ''}
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
            text="Orçamento convertido:"
            name="converted_price"
            placeholder="Orçamento convertido"
            value={convertedPrice ? convertedPrice : ''}
            readOnly
        />
        <Input 
          type='number' 
          text='Quantidade do produto:' 
          name='quantityCategory'
          placeholder='Tempo da categoria: 2 Hosts... ?'
          value={project.quantityCategory ? project.quantityCategory : ''}
          handleOnChange={(e) => {
            setProject({ ...project, quantityCategory: e.target.value });
            budgetTotal(project.quantityTime, e.target.value);
          }}
        />
        <Select 
          name='category_id' 
          text='Selecione a categoria'
          options={categories}
          handleOnChange={handleCategory}
          value={project.category ? project.category.id: '0'}
        />
          <Select 
          name='time_id' 
          text='Selecione o período'
          options={times}
          handleOnChange={handleTime}
          value={project.time ? project.time.id: 'Mês'}
        />
          <Input 
          type='number' 
          text='Quantidade de tempo:' 
          name='quantityTime'
          placeholder='Tempo do período: 2 semanas...'
          value={project.quantityTime ? project.quantityTime : ''}
          handleOnChange={(e) => {
            setProject({ ...project, quantityTime: e.target.value });
            budgetTotal(e.target.value, project.quantityCategory);
          }}
        />
        <Input
            type="number"
            text="Orçamento total:"
            name="budget"
            placeholder="Orçamento total"
            value={budget ? budget : ''}
            readOnly
        />
        <SubmitButton text={btnText} handleSubmit={handleSubmit}/>
    </form>
    )
}