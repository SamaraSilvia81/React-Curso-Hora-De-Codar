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