import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Tarefa } from "../Componentes/Tarefa";
import { useNavigate } from "react-router-dom";




export const AtualizarTarefa = () => {
    const [usuarios, setUsuarios] = useState([])
    let navigate = useNavigate()



    const schemaAtualizarTarefas = z.object({

        id: z.string() //id da tarefa
            .min(1, "o campo id prcesia ter um caracter no mnímo"),

        descricao: z.string()
            .trim()
            .min(1, "Precisa ter mais que um caracter")
            .max(40, "Utrapassou a quantidade de caracteres")
            .regex(new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/), "Não aceitamos alguns caracteres especiais e nem números"),

        setor: z.string()
            .trim()
            .min(1, "Precisamos de 1 caracter pelo menos")
            .max(20, "Utrapassou a quantidade de caracteres")
            .regex(new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/), "Não aceitamos alguns caracteres especiais e nem números"),

        prioridade: z.enum(["Baixa", "Media", "Alta"]),

        idUser: z.string().min(1, "Perfil é obrigatório"),

        status: z.enum(["Fazer", "Fazendo", "Pronto"])// ID da ForeignKey


    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: zodResolver(schemaAtualizarTarefas) })

    //listando usuarios e mudando o status do input de select
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/usuario/criarListarUsuario/")
            .then(response => {
                console.log("listando usuários: ", response.data)
                setUsuarios(response.data)
            })
            .catch(error => console.log("Erro ao buscar usuários:", error));
    }, []);

    //atualizar tarefa
    const obterdados = async (data) => {
        try {

            const payload = {
                descricao: data.descricao,
                setor: data.setor,
                prioridade: data.prioridade,
                usuario: data.idUser,
                status: data.status
            }

            const response = await axios.patch(`http://127.0.0.1:8000/api/tarefas/pkAtualizarDeletarTarefas/${data.id}`, payload)
            console.log(response.data)
            alert("Tarefa atualizada")
            navigate("/quadros")
            window.location.reload()
        } catch (error) {
            console.error("error", error)
            console.error("error", error.response)
            console.error("error", error.response.data)
        }
    }

    return (
        <>
            <form className="formularioTarefas" onSubmit={handleSubmit(obterdados)}>
                <h2>Atualizar Tarefa</h2>

                {/* id tarefa:  */}
                <label htmlFor="idTarefaInput">Id da tarefa: : </label>
                <input aria-required id="idTarefaInput" type="number" placeholder="id da tarefa" {...register('id')} />
                {errors?.id && <p className="error">{errors?.id.message}</p>}

                {/* Descrição  */}
                <label htmlFor="atualizarDescricaoInput">Descricao: </label>
                <input aria-required id="atualizarDescricaoInput" type="text" placeholder="Codificar back-end" {...register('descricao')} />
                {errors?.descricao && <p className="error">{errors?.descricao.message}</p>}

                {/* setor:  */}
                <label htmlFor="atualizarSetor">Setor: </label>
                <input aria-required id="atualizarSetor" type="text" placeholder="BISB" {...register('setor')} />
                {errors?.setor && <p className="error">{errors?.setor.message}</p>}

                {/* prioridade:  */}
                <label htmlFor="atualizarPrioridade">Prioridade: </label>
                <select aria-required name="prioridade" id="atualizarPrioridade" {...register('prioridade')}>
                    <option value="Baixa">Baixa</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
                {errors?.prioridade && <p className="error">{errors.prioridade.message}</p>}

                {/* pertence a:  */}
                <label htmlFor="atualizarUsuario">Usuario: </label>
                <select aria-required id="atualizarUsuario" {...register('idUser')} required>
                    <option value="" disabled >Selecione um usuario</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nomeUsuario}
                        </option>
                    ))}
                </select>
                {errors?.idUser && <p className="error"> {errors.idUser.message}</p>}

                {/* status tarefa:  */}
                <label htmlFor="status">Status</label>
                <select aria-required id="status" {...register("status")}>
                    <option value="Fazer">Fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Pronto">Pronto</option>
                </select>

            
                <button aria-label="Atualizar tarefa" type="submit">
                    Atualizar
                </button>
            </form>
        </>
    )
}

export default AtualizarTarefa;