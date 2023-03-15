import {Link } from 'react-router-dom';
import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/logo.png'

export function NavBar(){
    return(
        <nav>
          <Container>
            <Link to='/'><img src={logo} alt='Coasts Logo'/></Link>
            <Link to='/'>Home</Link>
            <Link to='/company'>Company</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/newproject'>NewProject</Link>
          </Container>
        </nav>
    )
}