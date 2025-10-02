import { set } from 'zod';
import { Tarefa } from './Tarefa'; 
import { useDroppable } from '@dnd-kit/core';

export function Coluna( {id,titulo, tarefas =[]}){
    const {setNodeRef} = useDroppable({id})

    return(
<section className='containerColuna' drop="true" ref={setNodeRef} >
            {/*Titulo que recebi da coluna */}
            <h2 className='tituloColuna'>{titulo}</h2>
            {/* manipulação de array para fazer a exibição, eu posso usar o MAP */}
            {tarefas.map(tarefa=>{
                console.log("Dados", tarefa);
                return<Tarefa key={tarefa.id} tarefa = {tarefa}/>
            })}
        </section>

    )
}
