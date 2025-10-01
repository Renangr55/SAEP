import React, { use, useEffect, useState } from "react";
import { Cabecalho } from "../Componentes/Cabecalho";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";


const schemaCadTarefas = z.object({ 
    descricao: z.string()
    .trim()
    .min(1,"Precisa ter mais que um caracter")
    .max(40,"Utrapassou a quantidade de caracteres")
    .regex(new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/),"Não aceitamos alguns caracteres especiais e nem números"),

    setor: z.string()
    .trim()
    .min(1,"Precisamos de 1 caracter pelo menos")
    .max(20,"Utrapassou a quantidade de caracteres")
    .regex(new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/),"Não aceitamos alguns caracteres especiais e nem números"),

    prioridade: z.enum(["Baixa","Media","Alta"]),

    idUser: z.string().min(1, "Perfil é obrigatório"),
    
    status: z.enum(["Fazer","Fazendo","Pronto"])// ID da ForeignKey



})

export function CadTarefas(){

    const [usuarios, setUsuarios] = useState([])

    

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: zodResolver(schemaCadTarefas)})

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/usuario/criarListarUsuario/")
        .then(response => {
            console.log("listando usuários: ",response.data)
            setUsuarios(response.data)
        })
        .catch(error => console.log("Erro ao buscar usuários:", error));
    }, []);


    
        async function obterdados(data) {
            console.log(`dados inseridos: ${data}`)
            
            try{
                await axios.post('http://127.0.0.1:8000/api/tarefas/criarListarTarefas/',data)
                alert("Cadastro de atividade concluido")
                reset()

            } catch(error){
                console.log("Erro",error)
                console.log("erro 1", error.response.data)
            }
        }
    return (
        <>
            <form className="formularioTarefas" onSubmit={handleSubmit(obterdados)}>
                <h2>Criar tarefas</h2>
                
                {/* descrição da atividade */}
                <label htmlFor="descricaoInput">Descricao: </label>
                <input id="descricaoInput" type="text" placeholder="Codificar back-end" {...register('descricao')} />
                {errors?.descricao && <p>{errors?.descricao.message}</p>}

                {/* setor da atividade */}
                <label htmlFor="setorInput" >Setor: </label>
                <input id="setorInput" type="text" placeholder="BISB" {...register('setor')}/>
                {errors?.setor && <p>{errors?.setor.message}</p>}

                {/* prioridade da tarefa*/}
                <label htmlFor="prioridadeSelect" >Prioridade: </label>
                <select name="prioridade" id="prioridadeSelect" {...register('prioridade')}>
                    <option value="Baixa">Baixa</option>
                    <option value="Media">Media</option>
                    <option value="Alta" selected>Alta</option>
                </select>
                {errors?.prioridade && <p className="error">{errors.prioridade.message}</p>}

                {/* usuario pertecente a tarefa */}
                <label htmlFor="usuarioSelect">Usuario: </label>
                <select id="usuarioSelect" {...register('idUser')} required>
                    <option value="" disabled >Selecione um usuario</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nomeUsuario}
                        </option>
                    ))}
                </select>
                {errors?.idUser && <p>{errors.idUser.message}</p>}
                
                {/* status da atividade */}
                <label htmlFor="statusSelect" >Status</label>
                <select id="statusSelect" {...register("status")}>
                    <option value="Fazer" selected>Fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Pronto">Pronto</option>
                </select>

                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </>
    )
}