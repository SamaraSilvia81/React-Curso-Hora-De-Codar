# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Utilizando React Fragments

> Fragments é um recurso do react que permite a criação de um componente sem um elemento pai.

- O propósito é descomplicar os nós do DOM;
- A sintaxe é <> e </>, não há um nome para a tag;
- Criamos no próprio JSX.

- **Lista.js** 

Criamos um componente "Lista" para exibirmos os dados que iremos criar.

```js

// Aplicando Conhecimentos de Fragments

import Item from './Item'

export function Lista (){
    return (
        <>
            <h1>Minha Lista</h1>
            <ul>
                <Item marca="Ferrari" />
                <Item marca="Fiat" />
                <Item marca="Renault"/>
                <Item marca="Chevrolet" />
                <Item/>
            </ul>
        </>
    )
}

```

Como exigimos que o ano fosse um dado number, então tivemos que colocar {} para receber o dado. Normalmente, usaríamos uma string - " " - para colocar esse dado.

- **Item.js**

Criamos esse componente para criar a estrutura da nossa lista, com as suas devidas props e configurações de type, exigindo que a "marca" seja uma string e o "ano" um number. 

Isso pois, o react, assim com o JS é fracamente tipado, então se quisermos fazer essas especificações precisaremos usar TypeScript ou o próprio "PropTypes".

```js

function Item (props){
    return (
        <>
            <li>
                {props.marca}
            </li>
        </>
    )
}

export default Item

```

- **App.js**

Lembre-se de importar o arquivo "Lista" no nosso app.js.

```js

import {Lista} from './components/fragments/Lista';
import './App.css';

function App() {

  return (
    <div className="App">
        <h1>Estudando Fragments</h1>
        <Lista/>
    </div>
  );
}

export default App;

```

## Avançando nas Props

> Podemos definir tipos para as props, realizando uma espécie de validação.

- Definimos em um objeto chamado `propTypes` no próprio componente;
- E ainda há a possibilidade de `definir um valor padrão`.
- Neste caso utilziaremos o objeto `defaultProps`.

- **Lista.js** 

Criamos um componente "Lista" para exibirmos os dados que iremos criar.

```js

// Aplicando Conhecimentos de Fragments e Tipagem de Props

import Item from './Item'

export function Lista (){
    return (
        <>
            <h1>Minha Lista</h1>
            <ul>
                <Item marca="Ferrari" ano_lancamento = {1985}/>
                <Item marca="Fiat" ano_lancamento = {1964}/>
                <Item marca="Renault"/>
                <Item marca="Chevrolet" ano_lancamento = {1922}/>
                <Item/>
            </ul>
        </>
    )
}

```

Como queremos que na variável "ano_lancamento" seja passado um number, tivemos que colocar {}. Isso sempre ocorre e devo ser utilizado dessa maneira.

- **Item.js**

Criamos esse componente para criar a estrutura da nossa lista, com as suas devidas props e configurações de type, exigindo que a "marca" seja uma string e o "ano" um number. 

Isso pois, o react, assim com o JS é fracamente tipado, então se quisermos fazer essas especificações precisaremos usar TypeScript ou o próprio "PropTypes".

```js

import PropTypes from "prop-types";

function Item ({marca,ano_lancamento}){
    return (
        <>
            <li>
                {marca} - {ano_lancamento}
            </li>
        </>
    )
}

Item.propTypes = {
    marca: PropTypes.string,
    ano_lancamento: PropTypes.number,
}

Item.defaultProps = {
    marca: 'Faltou a  marca',
    ano_lancamento:0
}

export default Item

```

- **Destruction**

Perceba que fizemos um `destruction` na definição das props, chamando as variávies atributos diretamente, ao invés de serem intermediadas pelo termo padrão "props".

- **propTypes**

Além do que, quando chamamos esse propTypes, nota-se que importamos o pacote, sendo representado pelo P maiúsculo, mas para o seu uso (validação) é com P minúsculo.

- **Erro de Tipagem**

Se no lugar de colocarmos um dado string em uma variável que exige isso, colocarmos um número, na nossa interface não aparecerá nenhum erro, mas no console sim. Ou seja, percebe-se que esse tipo de validação é a nível de programação.

- **App.js**

Lembre-se de importar o arquivo "Lista" no nosso app.js.

```js

import {Lista} from './components/fragments/Lista';
import './App.css';

function App() {

  return (
    <div className="App">
        <h1>Estudando Tipagem nas Props</h1>
        <Lista/>
    </div>
  );
}

export default App;

```

## Inserindo CSS no React

> O CSS pode ser adicionado de forma global na aplicação, por meio do arquivo index.css, por exemplo.

- Porém é possível estilizar a nível de componentes;
- Utilizamos o CSS modules para isso;
- Basta criar um arquivo com essa estrutura: Componente.module.css;
- E clamar este CSS no componente;

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

> Eventos são ações do usuários (como clicar em um botão ou mover o mouse sobre um elemento) que disparam uma função específica (conhecida como "handler" ou "manipulador") para lidar com essas ações.

- Os eventos de React são os mesmos eventos do DOM, ou seja, temos eventos para responder a um click, por exemplo.
- Essas funções são chamadas de `event handlers ` e são usadas para atualizar o estado do componente ou executar outras ações na aplicação.
- Pode-se dizer que o navegador escuta a ação do usuário. Lembra que quando estávamos estudando "Node Js + Express" que um elemento quando estava atrelado ao termo "on" remetia a "Ouvir algo" ? Então, aqui é a mesma coisa, por isso que os eventos começam com "on" - onChange - ouvir ação de mudança; onClick - ouvir ação de clicar em algo....
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

- **App.js**

```js

import {Condicional} from './components/condicional/Condicional'
import './App.css';

function App() {

  return (
    <div className="App">
        <h1>Renderização Condicional</h1>
        <Condicional/>
    </div>
  );
}

export default App;

```

Crie uma nova pasta com o nome "componente" e coloque um arquivo JS com o mesmo nome dentro dela.

- **Componente.js**

```js

import {useState} from 'react'

export function Condicional(){

    // estado para manipular os dados do email
    const [email, setEmail] = useState('')

    // estado para manipular o usuário do email
    const [userEmail, setUserEmail] = useState('')

    // Função que manipula o nosso form
    const enviarEmail = (e) => {
        e.preventDefault() // impede que seja enviado para o servidor, evitando um reload.
        console.log('Testando email...')
        setUserEmail(email)
        console.log(userEmail)
    }

    return(
        <div>
            <h2>Cadastre seu e-mail:</h2>
            <form>
                <input 
                    type='email' 
                    placeholder='Digite seu e-mail'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                    type='submit' 
                    onClick={enviarEmail}>Enviar e-mail
                </button>
            </form>
        </div>
    )
}

```

- **Atributo: Submit** 

Para esse caso, usamos diretamente o botão com o atributo "submit" e junto a ele o evento "onClick", para que quando o usuário click, o form tanto seja enviado, quanto passível de manipulação, ao se conectar com a função "enviarEmail".

- **State: Email**

Como queremos manipular o email com o seu estado `const [userEmail, setUserEmail] = useState('')`, como se fosse o email do usuário, então ele vai passar pelo método "enviarEmail" para depois ser submetido.

No caso, o primeiro state é para pegar os valores que estão sendo digitados no campo de entrada e o outro estado é manipularmos o dono do email.

Para conferirmos que está correto, chamamos o `userEmail` debaixo do botão "Enviar E-mail".

```js

import {useState} from 'react'

export function Condicional(){

    const [email, setEmail] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const enviarEmail = (e) => {
        ...
    }

    return(
        <div>
            <h2>Cadastre seu e-mail:</h2>
            <form>
                <input /> ...
                <button 
                    type='submit' 
                    onClick={enviarEmail}>Enviar e-mail
                </button>
                {
                    userEmail
                }
            </form>
        </div>
    )
}

```

Os "..." é só para aqui no relatório não está repetindo o mesmo código mil vezes. No seu compilador, escreva o código de fato.

Para deixarmos de uma maneira mais organizada podemos fazer da seguinte forma:

```js

{
    userEmail && (
        <div>
            o e-mail do usuário é: {userEmail}
        </div>
    )
}

```

Isso significa que, se o campo "email" for preenchido, então ele deve exibir uma div quando for enviado o email. Para testar, você pode colocar um email fictício e clicar no botão. E também, fazer a mesma coisa, mas sem colocar nada dentro, você verá que a mensagem que elaboramos não vai aparecer. Isso pois, não se encaixa na nossa condicional.

Já podemos vê que a renderizção condicional é ótima quando queremos fornecer segurança ao nosso site, por exemplo, implementando uma espécie de "autenticação". Mas não só com esse recurso podemos fazer isso, com a própria função "enviar email" podemos fazer isso.

Usamos o `&&` para concatenar com a nossa <div>.

- **LimparEmail**

Podemos também incrementar e limpar o email. Quando isso acontece, ele altera o valor do estado `setUserEmail`, consequentemente deixando vazio o `userEmail` e automaticamente a condição que estabelecemos passa a ser falsa.

```js

import {useState} from 'react'

export function Condicional(){

    const [email, setEmail] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const enviarEmail = (e) => {
        e.preventDefault()
        console.log('Testando email...')
        setUserEmail(email)
        console.log(email)
    }

    const limparEmail = (e) => {
        e.preventDefault()
        setUserEmail('') // limpa o nosso email
    }

    return(
        <div>
            <h2>Cadastre seu e-mail:</h2>
            <form>
                <input 
                    type='email' 
                    placeholder='Digite seu e-mail'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                    type='submit' 
                    onClick={enviarEmail}>Enviar e-mail
                </button>
                {
                    userEmail && (
                        <div>
                            <p>o e-mail do usuário é: {userEmail}</p>
                            <button onClick ={limparEmail}>Limapr e-mail</button>c
                        </div>
                    )
                }
            </form>
        </div>
    )
}

```

## Renderização de Listas

> Renderização de lista, envolve executarmos uma lista javascript dentro do componente html.

- Para renderizar uma lista vamos primeiramente precisar de um `array`;
    - Essa lista poderá compor qualquer tipo de dado, mas em uma aplicação real é mais fácil ter-se uma lista de objetos.
    - Por exemplo, tendo um usuário como tema do nosso objeto, ele poderá ter nome, idade, características e afins.
- Depois utilizamos a `função map`, para percorrer cada um dos itens; (`for each` e ademais funções básicas de JS poderão ser muito úteis aqui)
- Podendo assim renderizar algo na tela;
- É possível `unir operadores condicionais` com a renderização de listas.

- **OutraLista.js**

```js

export function OutraLista({itens}){
    return (
        <>

            <h3>Lista de Coisas Boas:</h3>
            {
                itens.map( (item) => (
                    <p>{item}</p>
                ))
            }
        </>
    )
}

```

Como estamos usando lógica para mapear os dados da nossa lista vamos abrir {}, mas para renderizar uma tag html usaremos (), ao invés do {} padrão de uma arrowFunction.

Algo que o React reclamou é que quando fazemos um map, por padrão cada item precisa ter seu ID único. 

Isso porque, em um dado real no nosso array teremos um Id que conterá como um chave um id, por exemplo.

Mas nesse caso não temos, então como poderemos imprimir uma propriedade key nos meus elementos n vezes ? Iremos adicionar uma outra prop dita como `index` para capturar a posição de cada elemento.

```js

export function OutraLista({itens}){
    return (
        <>

            <h3>Lista de Coisas Boas:</h3>
            {
                itens.map((item, index) => (
                    <p key={index}>{item}</p>
                ))
            }
        </>
    )
}

```

O que fizemos não é o mais recomendado, sendo então ter um id no back-end, porém dessa forma é aceitável.

- **Renderização Condional Ternária**

Se por algum acaso chamamos nossa lista, mas não colocarmos dados dentro dela ela iria ser exibida normal, mas sem retornar nada, o que não é legal, deve-se ter ao menos uma resposta indicando que não tem itens naquela lista.

```js

export function OutraLista({itens}){
    return (
        <>

            <h3>Lista de Coisas Boas:</h3>
            { itens.length > 0 ? (
                itens.map((item, index) => (
                    <p key={index}>{item}</p>
                ))) : (
                    <p>Não há itens na lista!</p>
                )
            }
        </>
    )
}

```

Dessa forma, fazemos um if ternário, indicando que se dentro do nosso array o seu tamanho for maior que 0, ou seja, houver algo dentro, então ele executará o nosso map normal, caso contrário irá renderizar apenas um resposta qualquer.

- **App.js**

Usamos o nosso app para chamar o componente lista e também para criarmos os dados que serão exibidos nelas.

O ideal é esses dados virem de fora, porém para fins lúdicos fizemos no nosso app mesmo.

```js

import {OutraLista} from './components/list/OutraLista';
import './App.css';

function App() {

  const meusItens = ['React','Vue','Angular']

  return (
    <div className="App">
        <h1>Renderização de Listas</h1>
        <OutraLista itens={meusItens}/>
        <OutraLista itens={[]}/>
    </div>
  );
}

export default App;

```

## State Lift

> É uma técnica utilizada para compartilhar o state.

- É normal vários componentes `dependerem do mesmo estado`;
- Então, precisaremos elevar o nível do mesmo a um `componente pai`;
- Então, centralizamos o state no pai, e `definimos quem usa e quem define ` (setState).  

- **SeuNome.js**

Geralmente, para pegarmos o valor do input é só fazermos um `useState()` padrão. Porém, teríamos problemas quando fossemos subir esse valor do state para reutilizar em outro componente.

```js

import { useState } from "react"

export function SeuNome(){

    const [name, setName] = useState('');

    return (
        <div>
            <p>Digite seu nome</p>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Qual o seu nome?"
            />
        </div>
    )
}

```

Para ajeitarmos essa questão só precisamos colocar o nosso state no componente pai que não necessariamente precisa ser o nosso "App.js". 

Por exemplo, no exemplo da tipagem da lista, criamos dois componentes - Item e Lista - e Lista era o componente pai de Item...

- **SeuNome.js**

```js

export function SeuNome({setNome}){

    return (
        <div>
            <p>Digite seu nome</p>
            <input 
                type="text" 
                onChange={(e) => setNome(e.target.value)}
                placeholder="Qual o seu nome?"
            />
        </div>
    )
}

```

- **App.js**

```js

import {SeuNome} from './components/lift/SeuNome';
import { useState } from "react"
import './App.css';

function App() {

  const [nome, setNome] = useState('');

  return (
    <div className="App">
        <h1>State Lift</h1>
        <SeuNome setNome={setNome} />
    </div>
  );
}

export default App;

```

Como uma forma de brincar podemos até em tempo real o nosso valor sendo armazenado.

```js

<div className="App">
    <h1>State Lift</h1>
    <SeuNome setNome={setNome} />
    {nome} {/*Edição automática*/}
</div>

```

Podemos também usar esse dados de outra forma, seguindo a lógica dos outros componentes com um button...

- **SeuNome.js**

```js

export function SeuNome({nome, setNome}){

    const meuNome = (e) => {
        e.preventDefault()
        setNome(nome)
        console.log(nome)
    }

    return (
        <div>
            <p>Digite seu nome</p>
            <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Qual o seu nome?"
            />
            <button 
                onClick={meuNome}>Enviar
            </button>
        </div>
    )
}

```

- **App.js**

```js

import {SeuNome} from './components/lift/SeuNome';
import {Saudacao} from './components/lift/Saudacao';
import { useState } from "react"
import './App.css';

function App() {

  const [nome, setNome] = useState('');

  return (
    <div className="App">
        <h1>State Lift</h1>
        <SeuNome nome={nome} setNome={setNome} />
        <Saudacao nome={nome}/>
    </div>
  );
}

export default App;

```

Podemos fazer muito mais do que fizemos, pois integrar o state ao componente pai é a premissa do State Lift, mas podemos também "manipular" esse dado da seguinte forma.

- **Saudacao.js**

Crie um componente com este nome na mesma pasta que esta o arquivo "SeuNome.js".

```js

export function Saudacao({nome}){
    return <> <p>Bom dia {nome} </p> </>
}

```

E no nosso arquivo "App.js" o importe.

- **App.js**

```js

import {SeuNome} from './components/lift/SeuNome';
import {Saudacao} from './components/lift/Saudacao';
import { useState } from "react"
import './App.css';

function App() {

  const [nome, setNome] = useState('');

  return (
    <div className="App">
        <h1>State Lift</h1>
        <SeuNome nome={nome} setNome={setNome} />
        <Saudacao nome={nome}/>
    </div>
  );
}

export default App;

```

Além disso, podemos incrementar ainda mais o nosso código. Dessa forma, temos um fim para o state lift que é alterar o dado para se ter uma saudação.

- **Saudacao.js**

```js

export function Saudacao({nome}){

    function gerarSaudacao(algumNome){
        return `Olá, ${algumNome}, tudo bem?`
    }

    return <> <p>{gerarSaudacao(nome)}</p> </>
}

```

Podemos incrementar ainda mais evitando que erros aconteçam quando não tem nada dentro do input, colocando em prática os nossos estudos de renderização condicional.

- **Saudacao.js**

```js

export function Saudacao({nome}){

    function gerarSaudacao(algumNome){
        return `Olá, ${algumNome}, tudo bem?`
    }

    return <> { nome && <p>{gerarSaudacao(nome)}</p>} </>
}

```

## Implementando o React Router

> O react router é um pacote para mudança de URLs da aplicação.

- Podemos assim acessar outras views, `sem o page roload`.
- `Trocando apenas uma parte do layout da aplicação`, ou seja, o que muda de view para view.
- Precisamos instalar este pacote no projeto: `npm install react-router-dom`;
- E também realizar algumas mudanças em como o App é estruturado.

- **App.js** 

Esse componente - Router - é o que vai rotear as nossas páginas.

Nesse bloco de código eu posso tanto as views, rotas, quanto também componentes padrões que serão parte do nosso layout.

```js

import { BrowserRouter as Router, Routes ,Route,Link } from "react-router-dom"
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
            <li>
            <Link to='/empresa'>Empresa</Link>
          </li>
            <li>
            <Link to='/contato'>Contato</Link>
          </li>
        </ul>
      </Router>
    </div>
  );
}

export default App;

```

- `Link to` funciona como uma tag <a> para fazer redirec, mas ele atua mais como uma tag especial para um roteamento por baixo dos panos.

Após termos configurado o nosso "App.js" vamos criar as páginas e colocar os componentes dentro delas.

Para simplificar o mesmo código qu eue colocar abaixo você copia e cola e só muda o título e o nome da página para: Home - Empresa - Contato. Tudo dentro da pasta "pages".

```js

export function Home(){
    return (
        <div>
            <h1>Home</h1>
            <p>Contéudo da Página</p>
        </div>
    )
}

``` 

Embora utilizamos as tags <ul> e <li> para fazer uma lista, o próprio react-router tem sua própria configuração para isso, no caso: <Routes> e <Route>.

Embora que, fizemos a nossa barra de navegação - NavBar - com as <ul> e <li> precisamos ainda chamar os nossos componentes e para isso utilizaremos o componente <Routes>, outrora dito como <Switch> para que quando cliquemos em "home" ele endereçar para o nosso componente "home" sem precisar de um reload e na mesma seção da página.

```js

import { BrowserRouter as Router, Routes ,Route,Link } from "react-router-dom"
import {Home} from './pages/Home';
import {Empresa} from './pages/Empresa';
import {Contato} from './pages/Contato';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
            <li>
            <Link to='/empresa'>Empresa</Link>
          </li>
            <li>
            <Link to='/contato'>Contato</Link>
          </li>
        </ul>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/empresa' element={<Empresa />} />
          <Route path='/contato' element={<Contato />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

```

Quando o react ler as path para acessar as páginas ele sempre vai ler o "/" e depois o "/ " alguma coisa, porque ele vai vê que tudo começa com "/". Assim, para evitarmos esse tipo de leitura diremos que a path "/" só ser acessada quando o path for exatamente "/". 

Assim, evita-se que a página fique congelada na página home.

```js

import { BrowserRouter as Router, Routes ,Route,Link } from "react-router-dom"
import {Home} from './pages/Home';
import {Empresa} from './pages/Empresa';
import {Contato} from './pages/Contato';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
            <li>
            <Link to='/empresa'>Empresa</Link>
          </li>
            <li>
            <Link to='/contato'>Contato</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/empresa' element={<Empresa />} />
          <Route path='/contato' element={<Contato />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

```

Percebe-se também que, a nossa barra de navegação é fixa, isso porque, está fora do escopo do <Routes>. Vamos ajeitá-la para fins organizacionais.

- **NavBar.js**

```js

import { Link } from "react-router-dom"

export function NavBar(){
    return(
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
            <li>
            <Link to='/empresa'>Empresa</Link>
          </li>
            <li>
            <Link to='/contato'>Contato</Link>
          </li>
        </ul>
    )
}
```

Após ter criado o componente NavBar, o importe na nossa página principal.

- **App.js**

```js

import { BrowserRouter as Router, Routes ,Route } from "react-router-dom"
import {Home} from './pages/Home';
import {Empresa} from './pages/Empresa';
import {Contato} from './pages/Contato';
import {NavBar} from './components/NavBar';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/empresa' element={<Empresa />} />
          <Route path='/contato' element={<Contato />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

```

Da mesma forma que temos a nossa barra de navegaçaõ também temos o nosso <Footer>. E para fins organizacionais, podemos colocar tanto a NavBar quanto ele na pasta Layout.

- **Footer**

```js

export function Footer(){
    return(
       <footer>Rodapé</footer>
    )
}

```

O interessante de tudo isso é que todo esse layout não será substituído, mas reaproveitado página a página.

- **App.js**

```js

import { BrowserRouter as Router, Routes ,Route } from "react-router-dom"
import {Home} from './pages/Home';
import {Empresa} from './pages/Empresa';
import {Contato} from './pages/Contato';
import {NavBar} from './layout/NavBar';
import {Footer} from './layout/Footer';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/empresa' element={<Empresa />} />
          <Route path='/contato' element={<Contato />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

```

E para finalizar vamos estilizar melhor o nosso navBar.

- **NavBar.js**

```js
import { Link } from "react-router-dom"
import styles from './NavBar.module.css'

export function NavBar(){
    return(
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to='/'>Home</Link>
          </li>
            <li className={styles.item}> 
            <Link to='/empresa'>Empresa</Link>
          </li>
            <li className={styles.item}>
            <Link to='/contato'>Contato</Link>
          </li>
        </ul>
    )
}
```

- **Nav.module.css**

```css

.list{
    display: flex;
    list-style: none;
}

.item{
    margin-right: 1rem;
}

```


## React Icons
## Referências

- https://mui.com/material-ui/react-button/
- https://pt-br.reactjs.org/docs/handling-events.html