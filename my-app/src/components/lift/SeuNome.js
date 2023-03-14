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