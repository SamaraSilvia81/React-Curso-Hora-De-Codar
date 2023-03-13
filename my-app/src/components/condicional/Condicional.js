import {useState} from 'react'

export function Condicional(){

    const [email, setEmail] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const enviarEmail = (e) => {
        e.preventDefault()
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