import { useLocation  } from 'react-router-dom'

import {Message} from '../layout/Message';

export function Projects(){

    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
        console.log(location)
    }

    return (
       <div>
        <h1>Meus Projetos</h1>
        {
            message && <Message type='sucess' msg={message} />
        }
       </div>
    )
}