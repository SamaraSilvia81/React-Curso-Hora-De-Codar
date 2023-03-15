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