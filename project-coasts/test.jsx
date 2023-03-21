import { useState, useEffect } from 'react'
import { Input } from '../form/Input'
import { Select } from '../form/Select'
import { SubmitButton } from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

export function ProjectForm({ btnText, handleSubmit, projectData }) {

  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([])

  const [project, setProject] = useState(projectData || {});

  const [currency, setCurrency] = useState("BRL");
  const [convertedBudget, setConvertedBudget] = useState(
    projectData ? projectData.converted_budget : null
  )

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: 'GET',
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((e) => console.log(e))
  }, [])

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
    setProject({
      ...project, category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

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

  const convertCurrency = (value, fromCurrency, toCurrency) => {

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
    const convertedValue = value / conversionRate;
    return convertedValue.toFixed(2);
};

return (
<form className={styles.form} onSubmit={submit}>
<Input
label="Nome do projeto"
name="name"
value={project.name || ""}
onChange={handleChange}
required
/>

<Select
    label="Categoria"
    name="category"
    value={project.category?.id || ""}
    onChange={handleCategory}
    options={categories}
    required
  />

  <Input
    label="Orçamento (em BRL)"
    name="budget"
    type="number"
    value={project.budget || ""}
    onChange={handleChange}
    required
  />

  <Select
    label="Moeda"
    name="currency"
    value={project.currency?.id || ""}
    onChange={handleCurrency}
    options={currencies}
    required
  />

  {convertedBudget && (
    <p>
      Orçamento convertido: {currency} {convertedBudget}
    </p>
  )}

  <SubmitButton text={btnText} />
</form>

//Em sistema que pega os dados do usuario - nome e dinheiro - ajuste este código para que ele possa converter os dados corretamente. Por exemplo, se eu selecionar BRL eu quero que o valor continue o mesmo que foi digitado. Se eu selecionar USD eu quero que converta o valor para Dolar. E se eu voltar de novo para BRL converta novamente para o valor original. Este é o código