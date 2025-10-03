//formas para fazer a validação de um formulário usando o REACT
//zod, trabalha com mais componentes para fazer sentido na sua valaidação
//Os triamigos são "zod" "useForm", //resolvers (mãezona)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { Cabecalho } from "../Componentes/Cabecalho";
import { useNavigate } from "react-router-dom";
import z from "zod";
 
//zod campo a campo o que eu valido, e ql a mensagem que eu exibo , se der um erro

const schemaCadUsuario = z.object({
    //o que eu recebo
     nomeUsuario: z.string()
        .min(1, 'Preencha o campo nome, por favor')
        .max(30, 'O campo permite até 30 caracteres')
        .regex(new RegExp(/^[A-Za-zÀ-ú ]+$/),'O campo username só aceita letras e espaços')
        .transform((val) => val.trim()),
    

   
    emailUsuario: z.string()
        .min(1, 'Preencha o campo email, por favor')
        .max(50, 'O campo permite até 50 caracteres')
        .email('Insira um email válido')
        .regex(new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i), "Formato inválido")
        .transform((valorEmail) => valorEmail.trim()),
    });
 
// Crianção do componente
export function CadUsuario(){
   
    const navigate = useNavigate()
    const {
    setValue,
    register,//registra para mim 
    handleSubmit,// no momento em que eu submeter(clicar em cadastrar)
    formState: { errors }, //o que ta no formulario // se der ruim deixa na variavel errors
    reset
} = useForm({ resolver: zodResolver(schemaCadUsuario) });//mamae junta os 3 e faz a validação
 
    async function obterDados(data) {
        console.log("dados inseridos", data)
 
        //chamada a API 
        try{
            await axios.post('http://127.0.0.1:8000/api/usuario/criarListarUsuario/', data);

            alert("Usuário cadastrado com sucesso!!");
            reset();
        // se der problema mostro uma mensagem de erro
        }catch(error){
            console.error("Deu ruim hein", error)
            console.error("erro de envio de dados",error.response.data);
            console.error(error.request.response)    
            console.error("request mal sucedida",error.response.status);
            console.error("erro 3", error.response.headers);

            if (error.response?.data?.nomeUsuario?.[0]?.includes("already exists")) { //exibindo alerta de usuario cadastrado
                alert("Nome do usuário já cadastrado!");
                return;
            }

            
            
        }
       
    }    
    return(
        <>
            <Cabecalho />
        
            {/* //no momento da submissao chamo as funções  */}
            <form className="formulario"onSubmit={handleSubmit(obterDados)}>

                <h1>Cadastro de Usuário</h1>

                <label htmlFor="nomeInput" >Nome:</label>
                {/* o register pega o valor inserido num campo input */}
                <input 
                aria-required="true" 
                id="nomeInput" 
                type="text" 
                placeholder="Jose da Silva" 
                aria-invalid={!!errors?.nomeUsuario}
                aria-labelledby={errors?.nomeUsuario ? "erroInputNomeUsuario" : undefined}

                
                {...register('nomeUsuario')}/>
                {/* Se der erro eu crio um novo paragrafo para exibir a mensagem */}
                {errors?.nomeUsuario && <p className="error">{errors?.nomeUsuario.message}</p>}
    
                <label htmlFor="emailInput" >E-mail:</label>
                <input 
                aria-required="true"
                id="emailInput" 
                type='email' 
                placeholder="email@dominio.com.br"
                aria-invalid={!!errors?.nomeUsuario}
                aria-labelledby={errors?.emailUsuario ? "erroInputEmail" : undefined} 
                {...register('emailUsuario')}/>
                {errors?.emailUsuario && <p className="error" id="erroInputEmail">{errors.emailUsuario.message}</p>}
    
                <button aria-label="Cadastrar usuários" type="submit">Cadastrar</button>
            </form>
        </>
    )
}

export default CadUsuario