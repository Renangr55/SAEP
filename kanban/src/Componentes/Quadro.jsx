//hooks são palavras reservadas que nos ajudam a desenvolver nossas aplicações
//começou com "use" 98% de chance de ser um hook do react
//state grava o estado atual de uma variavel
//effect é fofoqueiro, ele quer contar o que o usuário precisa saber
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Coluna } from './Coluna';
import {CadTarefas} from '../Paginas/CadTarefas'
import { Cabecalho } from "./Cabecalho";
import { DndContext } from "@dnd-kit/core"; // biblioteca que me permite a area que você pode clicar e arrastar

export function Quadro(){
    const [tarefa, setTarefas] = useState([])

    //()recepção de parametros, {} scripts, []dependencias
    useEffect(() =>{
        const apiURL = 'http://127.0.0.1:8000/api/tarefas/criarListarTarefas/';
        //axios faz requisição http
        axios.get(apiURL)
            //se der bom eu armazeno o settarefas usando a resposta do axios
            .then(response =>{ setTarefas(response.data)})            //se der ruim eu vejo o problema no console
            .catch(error => { console.error("Deu ruim", error)})
    },[]);

    //caminho final do drag drop
    function handleDragEnd(event){
        const { active, over } = event

        if(over && active){
            const tarefasID = active.id
            const novaColuna = over.id

            setTarefas(prev=>
                prev.map(tarefa=>
                    tarefa.id === tarefasID ?{...tarefa, status: novaColuna}:tarefa
                )
            );
            axios.patch(`http://127.0.0.1:8000/api/tarefas/pkAtualizarDeletarTarefas/${tarefasID}`,{
                status: novaColuna
        }).catch(err => console.error("Houve erro", err))
        }
    }


    //tenho 3 arrays cada qual com um status de tarefas possivel no meu kanban 
    const tarefasAfazer = tarefa.filter(tarefa => tarefa.status ==='Fazer');
    const tarefasFazendo = tarefa.filter(tarefa => tarefa.status ==='Fazendo');
    const tarefasPronto = tarefa.filter(tarefa => tarefa.status ==='Pronto');
    

    return(
        <DndContext onDragEnd={handleDragEnd}>
            <main>
                <h1 className="quadro">Tarefas</h1>
                <article className="categoriasTarefas">
                    <Coluna id="Fazer" titulo = 'Fazer' tarefas={tarefasAfazer}/>
                    <Coluna id="Fazendo"  titulo = 'Fazendo' tarefas={tarefasFazendo}/>
                    <Coluna id="Pronto" titulo ='Pronto' tarefas={tarefasPronto}/>
                </article>
            </main>
        </DndContext>
     )
}