# Project Coasts

> É o projeto final do curso HoraDeCodar sobre reactJS, voltado a um gerenciamento de projetos.

- **Como irá funcionar?** 

## Criando Projeto 

Ao criar um projeto utilizando o React JS podemos utilizar os seguintes boilerplates:

- Create React App (CRA)
- Vite

❗Dica: Boilerplates se refere a seções de código que devem ser incluídas em muitos lugares. É um template, ou seja, uma forma padrão de se escrever algo que pode ser copiado.

## Quais as vantagens de utilziar Vite ao invés do CRA ?

O Vite tem todos os recursos do CRA, mas com melhores implementações e recursos adicionais que o CRA não suporta, com isso o Vite acaba sendo até 10x mais rápido em comparação ao CRA.

<img alt="Symbol-Code" height="20" weigth="20" style="border-radius:150px" src="https://user-images.githubusercontent.com/113690864/222425069-d1b2deb3-ccce-44f8-b64d-650a98a6fc4c.png"> **Criando o primeiro projeto com o Vite:** `npm create vite@latest reactapp --template react`

Colocamos "Template" para identificar que o projeto que estamos fazendo é React.

- Após rodar o comando acima, será exibido a tela para escolher o framework que deseja utilizar.

<img alt="Symbol-Code" height="400" weigth="400" style="border-radius:150px" src="https://storage.googleapis.com/golden-wind/discover/especializar/reactjs/criando-o-projeto-1.png"> 

- Em seguida, será questionado sobre a variant, escolheremos react que representa que não usaremos o TypeScript nesse projeto.

<img alt="Symbol-Code" height="400" weigth="400" style="border-radius:150px" src="https://storage.googleapis.com/golden-wind/discover/especializar/reactjs/criando-o-projeto-2.png">

⚠️ **Dica:** Se você for executar o código na sua máquina após dar um `git clone`, é só colocar no terminal `npm install`.

## Executando Projeto

Existem duas maneiras de navegar até a pasta do seu projeto, pelo próprio terminal, utilizando o comando cd ou arrastando a pasta do projeto para dentro do VS Code.

Em seguida, será necessário baixar as dependências necessárias para a execução do projeto. Podemos utilizar o npm quanto o yarn como gerenciador de pacotes.

Certifique-se que está na pasta do projeto e execute o comando desejado:
    - `yarn install`
    - `npm install`

Além disso, é preciso instalarmos algumas dependências como:
    - `npm install json-server`
    - `npm install react-router-dom`
    - `npm install react-icons`
    - `npm install wwid`

Após a instalação das dependências, execute o comando abaixo:

_Utilize o mesmo gerenciador do comando anterior_
    - `npm run dev`
    - `yarn dev`

Após executar o comando acima, abra o seu navegador e acesse o endereço: `http://localhost:5173/`

<img alt="Symbol-Code" height="400" weigth="400" style="border-radius:150px" src="https://storage.googleapis.com/golden-wind/discover/especializar/reactjs/executando-projeto.png">

- **App.jsx**

```jsx

import './index.css'

function App() {
  return (
    <div>
        <h1>Coasts</h1>
    </div>
  )
}

export default App

```

- **index.css**

```css

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box; /* Inputs e buttons não ultrapassar as áreas máximas das divs*/
    font-family: 'Opens Sans', sans-serif;
}

html, body, #root{
    background-color: #EFEFEF;
    height: 100%;
    
}

```

- **index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./public/favicon.ico"/>

    <!--Google Fonts: Open Sans-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coasts</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

Não esqueça de baixar as fotos no repositório do projeto - última brnach - e colocar todas elas na pasta img.

![Respositório Link](https://github.com/matheusbattisti/curso_react_yt/tree/16_projeto_costs)

## Estruturando o Projeto

Vamos fazer o roteamento das nossas páginas, implementando o React Router.

- **App.jsx**

```jsx

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { Company } from './components/pages/Company';
import { Contact}  from './components/pages/Contact';
import { NewProject } from './components/pages/NewProject';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/company" element={<Company/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/newproject" element={<NewProject/>}/>
        </Routes>
    </Router>
  )
}

export default App

```

Todo o conteúdo das nossas páginas, sendo chamadas pelo <Routes> serão colocadas dentro de um componente específico chamado de <Container/>, assim poderemos reutlizar ele em vários locais. Não somente ele, mas podemos colocar também componentes de mensagens (alertas) e outros.

Para isso, dentro da pasta `layout` vamos criar um arquivo `Container.jsx` e colocarmos todo essa call dentro.

- **Container.jsx**

```jsx

import styles from './Container.css'

export function Container(props){
    return <div> {props.children} </div>
}

```

A lógica que o rege é que, esse nosso container vai receber props, que por sua vez, serão todas as nossas páginas.

Dentro do container iremos alterar classes que mudarão a disposição dos nossos itens nas páginas. Então, será um container flex.

Quando envolvemos vários componentes em um só, se não colocarmos uma sintaxe especial para referenciar (props), então ele não vai entender onde colocar as nossas páginas. 

Por exemplo, o próprio <Routes> já faz isso, mas faremos de novo, porém com o nosso próprio container.

`props.children` refere-se aos elementos filhos que estão encapsulados nesse componente <Container/> serão encaixados nessa div.

Em resumo,  uso do <Container> aqui é uma forma de encapsular as rotas em um componente personalizado que fornece estilos e funcionalidades específicas. Isso pode tornar o código mais modular e fácil de manter.

```jsx

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { Company } from './components/pages/Company';
import { Contact}  from './components/pages/Contact';
import { NewProject } from './components/pages/NewProject';

import { Container } from './components/layout/Container';

function App() {
  return (
    <Router>
        <Container>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/company" element={<Company/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/newproject" element={<NewProject/>}/>
          </Routes>
        </Container>
    </Router>
  )
}

export default App

```

Vamos agora estilizar um pouco o nosso container.

- **Container.module.css**

```css

.container{
    width: 1200px; /*Largura máxima*/
    display: flex;
    justify-content: space-between; /* Espaçar os elementos iguais conforme a linha horizontal */
    margin: 0 auto;
    flex-wrap: wrap; /*Quando os elementos filhos ultrapassarem a largura limite ele irão para baixo, criando outra linha*/
}

/*Classes Help*/

.min-height{
    min-height: 75%; /*Para o conteúdo ocupar um grande espaço na tela*/
}

```

- **Container.jsx**

```jsx

import styles from './Container.module.css'

export function Container(props){
    return <div className={`${styles.container} ${styles[props.customClass]}`}> {props.children} </div>
}

```

Supondo que eu não queira que todas as minhas classes sejam propagadas para todos os meus componentes, então eu uso o "template string" para fazer essa seleção, ofertando dinamicidade, pois iremos tratar o styles como uma variável.

Para eu inserir classes que venham das minhas props iremos criar um [], para que esse styles acesse de forma seletiva as classes, e colocaremos o nome da variável.

```jsx

// Container.jsx

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { Company } from './components/pages/Company';
import { Contact}  from './components/pages/Contact';
import { NewProject } from './components/pages/NewProject';

import { Container } from './components/layout/Container';

function App() {
  return (
    <Router>
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/company" element={<Company/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/newproject" element={<NewProject/>}/>
          </Routes>
        </Container>
    </Router>
  )
}

export default App

```

Ao colocarmos essa nova variável de estilo `customClass="min-height"` estamos ativando a classe que criamos.

Outras classes que usaremos mais tarde são:

```css

.container{
    width: 1200px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    flex-wrap: wrap;
}

/*Classes Help*/

.min-height{
    min-height: 75%;
}

.start{
    justify-content: flex-start; /*Colocará todos pro inicio*/
}

/*O flex vem em row (linha)*/

.column{
    flex-direction: column;
    justify-content: flex-start;
}

```

## Estruturando a NavBar e Footer

Tendo criado a pasta layout, vamos criar os arquivos NavBar.jsx e Footer.jsx, além de os configurar e estilizar.

- **Navbar.jsx**

```jsx

import {Link } from 'react-router-dom';

export function NavBar(){
    return(
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/company'>Company</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          <li><Link to='/newproject'>NewProject</Link></li>
        </ul>
    )
}

```

Essa é a forma simples de usarmos o nosso NavBar, mas nesse caso também vamos utilizar o nosso container, já que ele é um componente estrutural que vai nos ajudar a posicionar melhor os elementos em diversas partes do projeto.

```jsx

import { Link } from 'react-router-dom';
import { Container } from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/logo.png'

export function NavBar(){
    return(
        <nav>
          <Container>
            <Link to='/'><img src={logo} alt="Coasts Logo"/></Link>
            <Link to='/'>Home</Link>
            <Link to='/company'>Company</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/newproject'>NewProject</Link>
          </Container>
        </nav>
    )
}

```

Mudamos de <ul> para <nav>, por questões semánticas de html.

Não esqueça de colcoar {} quando importar os componentes se neles você estruturou como `export function...`

É importante também colocarmos cada link organizado como listas, logo vamos os encapsular detro de <li>.

```jsx

import { Link } from 'react-router-dom';
import { Container } from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/logo.png'

export function NavBar(){
    return(
        <nav>
          <Container>
            <Link to='/'><img src={logo} alt="Coasts Logo"/></Link>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/company'>Company</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </ul>
          </Container>
        </nav>
    )
}

```

Vamos estilizar agora...

- **NavBar.module.css**

```css

.navBar{
    display: flex;
    justify-content: space-between;
    background-color: #222;
    padding: 1em;
}

.list{
    display: flex;
    list-style: none;
    align-items: center; /*Alinhar na vertical*/ 
}

.item{
    margin-right: 1em;
}

.item a{
    color: #fff;
    text-decoration: none;
}

.item a:hover{
    color: #FFBB33;
}

```

Uma dica para selecionar todos os <li> é apertar `ctrl+alt+(↑ ou → ou ↓ ou ←)`.

Não esqueça de chamar esses estilos dentro do nosso arquivo.

```jsx
import { Link } from 'react-router-dom';
import { Container } from './Container'
import styles from './NavBar.module.css'
import logo from '../../img/logo.png'

export function NavBar(){
    return(
        <nav className={styles.navBar}>
          <Container>
            <Link to='/'><img src={logo} alt="Coasts Logo"/></Link>
            <ul className={styles.list}>
              <li className={styles.item}><Link to='/'>Home</Link></li>
              <li className={styles.item}><Link to='/projects'>Projects</Link></li>
              <li className={styles.item}><Link to='/about'>About</Link></li>
              <li className={styles.item}><Link to='/contact'>Contact</Link></li>
            </ul>
          </Container>
        </nav>
    )
}

```

- **Projects.jsx**

Vamos também criar a página que vai exibir todos os nosso projetos na barra de navegação, chamada de `Projects.jsx`.

```jsx

// App.jsx

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';
import { Home } from './components/pages/Home';
import { Company } from './components/pages/Company';
import { Contact}  from './components/pages/Contact';
import { NewProject } from './components/pages/NewProject';
import { Projects } from './components/pages/Projects';

import { Container } from './components/layout/Container';

function App() {
  return (
    <Router>
        <NavBar/>
        <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/projects" element={<Projects/>}/>
          <Route exact path="/company" element={<Company/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/newproject" element={<NewProject/>}/>
        </Routes>
        </Container>
        <Footer/>
    </Router>
  )
}

export default App

```

E é claro vamos fazer essa importação na nossa NavBar.

```jsx

import { Link } from 'react-router-dom';
import { Container } from './Container'
import styles from './NavBar.module.css'
import logo from '../../img/logo.png'

export function NavBar(){
    return(
        <nav class={styles.navBar}>
          <Container>
            <Link to='/'><img src={logo} alt="Coasts Logo"/></Link>
            <ul class={styles.list}>
              <li class={styles.item}><Link to='/'>Home</Link></li>
              <li class={styles.item}><Link to='/projects'>Projects</Link></li>
              <li class={styles.item}><Link to='/company'>Company</Link></li>
              <li class={styles.item}><Link to='/contact'>Contact</Link></li>
            </ul>
          </Container>
        </nav>
    )
}

```

Para finalizar vamos estilizar e configurar o footer.

- **Footer.jsx**

```jsx

import {FaGithub,FaInstagram,FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

export function Footer(){
    return (
        <footer className={styles.footer}>
           <ul className={styles.social_list}>
            <li><FaGithub/></li>
            <li><FaInstagram/></li>
            <li><FaLinkedin/></li>
           </ul>
           <p className={styles.copy_right}><span>Coasts</span> &copy; 2023</p>
        </footer>
    )
}

```

- **Footer.module.css**

```css

.footer{
    background-color: #222;
    color: #fff;
    padding: 3em;
    text-align: center;
}

.social_list{
    display: flex;
    list-style-type: none;
    justify-content: center;
}

.social_list li{
    margin: 0 1em;
    color: #fff;
}

.social_list li:hover{
    color: #FFBB33;
}

.social_list svg{
    font-size: 1.5em;
    cursor: pointer;
}

.copy_right{
    margin-top: 2em;
}

.copy_right span{
    font-weight: bold;
    color: #FFBB33;
}

```

- **App.jsx**

```jsx

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Contact}  from './components/pages/Contact';
import { NewProject } from './components/pages/NewProject';
import { Projects } from './components/pages/Projects';

import { Container } from './components/layout/Container';

function App() {
  return (
    <Router>
        <NavBar/>
        <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/projects" element={<Projects/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/newproject" element={<NewProject/>}/>
        </Routes>
        </Container>
        <Footer/>
    </Router>
  )
}

export default App

```