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
                            <button onClick ={limparEmail}>Limapr e-mail</button>
                        </div>
                    )
                }
            </form>
        </div>
    )
}