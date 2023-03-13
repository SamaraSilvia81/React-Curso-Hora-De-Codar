import {Button} from './eventos/Button'

export function EventoClick() {

    function meuEvento(){
        console.log(`Ativando primeiro evento!`);
    }

    function segundoEvento(){
        console.log(`Ativando segundo evento!`);
    }

    return (
        <div>
            <p>Clique para disparar um evento</p>
            <Button event={meuEvento} text='Primeiro Evento'/>
            <Button event={segundoEvento} text='Segundo Evento'/>
        </div>
    )
}