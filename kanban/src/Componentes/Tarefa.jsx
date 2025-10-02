//props: são propriedades que passam de um componente para outro
import { useState } from "react";
import axios from "axios";
import { id } from "zod/v4/locales";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { data } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDraggable } from '@dnd-kit/core';
import { Link } from "react-router";




export function Tarefa({tarefa}){

    let navigate = useNavigate(); 

    const schemaCadTarefas = z.object({ 
       status: z.enum(["Fazer","Fazendo","Pronto"], "Escolha o status")// ID da ForeignKey
    })

    //para fazer o uso do draggable eu preciso usar o hook respectivo
    // ele precisa de 4 caracteristicas
    //atributes: permite a seleção dele pelos preriféricos
    //listerns: são os ouvintes que estão sempre ouvido algum evento
    // transform: é quem me da a sensação de movimento
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: tarefa.id
    });

    //style do drag drop
    const style = transform
        ?{transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`}
        :undefined;
    
    const {
            register,
            handleSubmit,
            formState: { errors },
            reset
        } = useForm({ resolver: zodResolver(schemaCadTarefas)})
    

    //editar status
    const editarStatus = async(data,id) => {
        try{
            const payload = {
                status: data.status 
            };

            const response = await axios.patch(`http://127.0.0.1:8000/api/tarefas/pkAtualizarDeletarTarefas/${id}`,payload)
        
            console.log(response.data)
            alert(`Campo status da tarefa |${id}| atualizado`)
            window.location.reload()

        } catch(error){
            console.log("deu erro", error)
        }
    }

   
    // deletar tarefa
    const deleteTarefa = async () => {
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/tarefas/pkAtualizarDeletarTarefas/${tarefa.id}`)
            console.log(response.data)
            alert("Atividade removida")
            window.location.reload();
        } catch(error){
            console.error("Deu erro em apagar", error)
            console.error("erro ", error.response.data)
        }
    }
    

    return(
        <div 
        role="region"
        className="areaTask"
        ref={setNodeRef} 
        draggable="true"
        aria-describedby="Tarefa"
        aria-label={`Tarefa pertencente ao usuário ${tarefa.idUser ?? 'ID não disponível'}`}
        style={style}
        {...listeners}
        {...attributes}>
            
            <dl>
                {/* Area do usuario que pertence a tarefa */}
                <div className="areaUsuario">
                    <dt> Pertence a: </dt>
                    <dd>{tarefa.idUser ?? "ID não disponivel "}</dd>
                </div>

                {/* Area da descrição da tarefa */}
                <div className="areaDescricao">
                    <dt>Descrição: </dt>
                    <dd>{tarefa.descricao}</dd>
                </div>

                {/*Area do setor  */}
                <div className="areaSetor">
                    <dt>Setor: </dt>
                    <dd>{tarefa.setor}</dd>
                </div>

                {/* Area da prioridade */}
                <div className="areaPrioridade">
                    <dt>Prioridade: </dt>
                    <dd>{tarefa.prioridade}</dd>
                </div>
                
            </dl>

            {/* Conteiner dos botões */}
            <div className="conteinerBotoes">
                <Link className="linkAtualizar" to='/atualizarTarefas'>Editar</Link>
                <button onClick={deleteTarefa} className="botaoExcluir" type="button">Excluir</button>
            </div>
            
            {/* editar status da tarefa */}
            <form className="checkBox" onSubmit={handleSubmit((data) => editarStatus(data,tarefa.id))}>
                <div className="statusBox">
                    <label htmlFor="status">Status:  </label>
                    <select 
                    id="status" 
                    name="status" 
                    aria-invalid="true"
                    aria-labelledby={errors?.status ? "erroInputStatusTarefa" : undefined}
                    {...register("status")}>
                        <option value = ''>Selecione o Status</option>
                        <option value = 'Fazer' >Fazer</option>
                        <option value = 'Fazendo'>Fazendo</option>
                        <option value = 'Pronto'>Pronto</option>
                    </select>
                    {errors?.status && <p className="error" id="erroInputStatusTarefa">{errors.status.message}</p>}
                </div>

                <div className="conteinerBotaoStatus">
                    <button className="botaoAlterarStatus" type='submit'>Alterar Status</button>
                </div>
            </form>
        </div>
    )
}