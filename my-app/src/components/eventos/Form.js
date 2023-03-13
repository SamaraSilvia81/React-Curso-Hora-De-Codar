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