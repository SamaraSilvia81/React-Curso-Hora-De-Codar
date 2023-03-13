function Pessoa({nome,idade,foto,profissao}) {

    return (
        <div>
            <img src={foto} alt="minha-foto"></img>
            <h2>Nome: {nome}</h2>
            <p>Idade: {idade}</p>
            <p>Profissão: {profissao}</p>
        </div>
    )
}

export default Pessoa