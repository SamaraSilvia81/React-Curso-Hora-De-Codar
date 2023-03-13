# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Inserindo CSS no React

> O CSS pode ser adicionado de forma global na aplicação, por meio do arquivo index.css, por exemplo.

Porém é possível estilizar a nível de componentes;
Utilizamos o CSS modules para isso;
Basta criar um arquivo com essa estrutura: Componente.module.css;
E clamar este CSS no componente;

- **Index.css**

```css

body {
  padding: 50px;
  padding-bottom: 50px;
}

h1{
  color: #333;
}

p{
  padding: 10px;
}

```

## Eventos no React (onClick e onSubmit)

> Os eventos de React são os mesmos eventos do DOM, ou seja, temos eventos para responder a um click, por exemplo.

- O evento é atrelado a uma tag que irá executá-lo.
- Geralmente um método é atribuído ao evento.
- Este método deve ser criado no componente.

### onClick

- **Evento.js**

Crie dentro da pasta "Components" um arquivo com este nome: Evento.js.

```js

export function Evento() {
    return (
        <div>
            <p>Clique para disparar um evento</p>
            <button onClick={meuEvento}>Ativar!</button>
        </div>
    )
}

```

Precisamos de um "handle", ou seja, algo para ativiar a tag.

Se na hora que eu chamar o evento eu já executar a função, ou seja, `meuEvento()`, então antes de ter o click ele irá executar a função, por isso, chamamos sem.

Não esqueça de chamar este componente na na nossa página.

- **App.js**

```js

import {Evento} from './components/Evento'
import './App.css';

function App() {

  return (
    <div className="App">
        <h1>Testando Eventos</h1>
        <Evento/>
      </div>
  );
}

export default App;

```

Podemos também trabalhar com propriedades dentro de eventos, como, por exemplo:

- **Evento.js**

```js

export function Evento({numero}) {

    function meuEvento(){
        console.log(`opa, fui ativado com um click! ${numero}`);
    }

    return (
        <div>
            <p>Clique para disparar um evento</p>
            <button onClick={meuEvento}>Ativar!</button>
        </div>
    )
}

```

- **App.js**

```js

import {Evento} from './components/Evento'
import './App.css';

function App() {

  return (
    <div className="App">
        <h1>Testando Eventos</h1>
        <Evento numero='1'/>
        <Evento numero='2'/>
      </div>
  );
}

export default App;

```

### onSubmit

> É um evento muito usado em formulários, sendo usado para capturar o envio de uma 'requisição'.

- **Form.js**

```js

export function Form(){

    function cadastrarUsuário(){
        console.log('Cadastro feito com sucesso!!')
    }

    return(
        <div>
            <h1>Meu Cadastro:</h1>
            <form onSubmit={cadastrarUsuário}>
                <div>
                    <input type='text' placeholder='Digite seu nome'/>
                </div>
                <div>
                    <input type='submit' value='Cadastrar'/>
                </div>
            </form>
        </div>
    )
}

```

- **App.js**

```js

import {EventoClick} from './components/Click'
import {Form} from './components/Form'
import './App.css';

function App() {

  return (
    <div className="App">
        <h1>Testando Eventos</h1>
        <EventoClick numero='1'/>
        <EventoClick numero='2'/>
        <Form/>
    </div>
  );
}

export default App;

```

Pelo formulário enviar a submissão para o back-end, então ele vai fazer um reload rápido na nossa página. Assim, dessa forma como fizemos a resposta no console não será vista. 

Então, para vermos essa requsição funcionando via AJAX precisamos capturar esse evento.

Interessante destacar que "Ajax" é um acrônimo para Assincronismo JavaScript e XML, ou seja, essa técnica permite que tudo aconteça numa mesma página, sem que seja preciso recarregá-la por completo toda vez que for necessário conectar ao servidor. (É o que representa o fluxo da SPA).

```js

export function Form(){

    function cadastrarUsuário(e){
        e.preventDefault() 
        //
        console.log('Cadastro feito com sucesso!!')
    }

    return(
        <div>
            <h1>Meu Cadastro:</h1>
            <form onSubmit={cadastrarUsuário}>
                <div>
                    <input type='text' placeholder='Digite seu nome'/>
                </div>
                <div>
                    <input type='submit' value='Cadastrar'/>
                </div>
            </form>
        </div>
    )
}

```

Esse `preventDefault()` irá parar a execução do formulário e executar em seguida todo o nosso código da função, isso porque, está abaixo do nosso "preventDefault()".

## useState na Prática

> o useState é um hook do React.

- Com ele conseguimos manusear o estado de um componente de forma simples;
- Este hook funciona muito bem com eventos;
- Podemos atrelar um evento a mudança de state.

### Hooks

> Entende-se por "hook" como uma função/método especial responsável por permitir que você "se ligue" aos recursos de state e ciclo de vida do React a partir de componenentes funcionais. 

- Hooks não funcionam dentro de classes - eles permitem que você use React sem classes.
- Permite que o nosso código fique mais fluído, facilitando o uso de lógicas longas que teríamos que codar na mão.
- Alguns deles são:
    - useState
    - useEffect

- **Form.js**

Para esse elemento vamos trabalhar no componente de formulário.

```js

import {useState} from 'react';

export function Form(){

    function cadastrarUsuário(e){
        e.preventDefault()
        console.log(`Name: ${name}`) 
        console.log(`Password: ${password}`) 
        console.log('Cadastro feito com sucesso!!')
    }

    const [name, setName] = useState('');
    const [password, setPassword] = useState(''); 

    return(
        <div>
            <h1>Meu Cadastro:</h1>
            <form onSubmit={cadastrarUsuário}>
                <div>
                    <label htmlFor='name'>Nome:</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Digite seu nome'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Senha:</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Digite a sua senha'
                    />
                </div>
                <div>
                    <input 
                        type='submit'
                        value='Cadastrar'
                    />
                </div>
            </form>
        </div>
    )
}

```

O interessante é que podemos inserir um valor padrão que será setado pelo state. Para isso, é só colocar dentro dos parênteses do useState e um valor e determinar a variável get desse state como parâmetro de alguma tag.

Por exemplo:

```js

const [name, setName] = useState('Samara');

<div>
    <label htmlFor='name'>Nome:</label>
    <input 
        type='text' 
        id='name' 
        name='name' 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Digite seu nome'
    />
</div>

```

- **App.js** 

Não esqueça de importar na nossa página.

```js

import {EventoClick} from './components/Click'
import {Form} from './components/Form'
import './App.css';

function App() {

  return (
    <div className="App">
        <h1>Testando Eventos</h1>
        <EventoClick numero='1'/>
        <EventoClick numero='2'/>
        <Form/>
    </div>
  );
}

export default App;

```

### onChange

> É um evento usado para capturar quando uma tag tem seu valor modificado.

Como pode-se vê usamos esse evento na funcionalidade anterior.

```js

<input 
    type='text' 
    id='name' 
    name='name' 
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder='Digite seu nome'
/>

```

Aqui usamos o `e.target.value` para que cada character que for colocado no input será captado pelo set do state.

## Passar eventos pro props

> Os métodos também podem ser passados por props, ou seja, um componente filho pode ativar o método do seu ancestral.

Vamos acessar o método por meio de um evento;

A sintaxe é a mesma de uma props de dados: `props.meuEvento`.

- **Button.js** 

Quando temos uma função que retorna apenas uma linha de código não é preciso inserir os () no return.

```js

export function Button(props){
    return <button>{props.text}</button>
}

```

O ideal é substituirmos o antigo <button> por essa lógica, no qual no componente `Button` teremos uma tag button que conterá como props um text padrão que é o nome do nosso botão e também um "event", como método que será chamado após o click, método esse capturado pelo evento onClick.

- **Click.js**

```js

// Antes

export function Evento({numero}) {

    function meuEvento(){
        console.log(`opa, fui ativado com um click! ${numero}`);
    }

    return (
        <div>
            <p>Clique para disparar um evento</p>
            <button onClick={meuEvento}>Ativar!</button>
        </div>
    )
}

```

- **Button.js**

```js

export function Button(props){
    return <button onClick={props.event}>{props.text}</button>
}

```

Faz mais sentido tem o método no componente pai e só chamá-lo em loop no componente filho. No caso, o filho vai compor a estrutura e lógica do meu evento, e no pai eu só vou passar os dados.

Além disso, podemos fazer vários eventos e passar eles como parâmetros, assim como fazemos com as props, ou seja, ou substituimos os valores ou duplicamos a chamada do componente com valores diferentes. 

```js

// Depois

import {Button} from './eventos/Button'

export function EventoClick() {

    function meuEvento(){
        console.log(`Ativando primeiro evento!`);
    }

    function segundoEvento(){
        console.log(`Ativando segundo evento!`);
    }

    return (
        <div>
            <p>Clique para disparar um evento</p>
            <Button event={meuEvento} text='Primeiro Evento'/>
            <Button event={segundoEvento} text='Segundo Evento'/>
        </div>
    )
}

```

❗Importante destacar que o nome da prop "event" é apenas um nome referenciativo, não tendo nenhum impacto de funcionalidade na nossa aplicação. Caso tenha dúvidas, pesquise por `props padrões do react`. 

Uma prop padrão seria, por exemplo, quando em algum componente colocamos "key" ou "disabled", que conferecem significado usável no nosso app. No caso do "disabled", ele pode de fato desativar a tag, no qual se refere na nossa aplicação.

## Renderização Condicional(if)

> Podemos atrelar a exibição de algum elemento a um `if`. Esta ação é chamada de `renderização condicional`.	

- Envolvemos as tags em chaves `{}`;
- Como as chaves executam JavaScript, então já criamos nossa condição.
- É possível usar o `state` para criar as condições.

## Renderização de Listas
## State Lift
## Implementando o React Router
## React Icons

## Referências

- https://mui.com/material-ui/react-button/
- https://pt-br.reactjs.org/docs/handling-events.html