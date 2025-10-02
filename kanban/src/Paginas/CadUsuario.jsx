//formas para fazer a validação de um formulário usando o REACT
//zod, trabalha com mais componentes para fazer sentido na sua valaidação
//Os triamigos são "zod" "useForm", //resolvers (mãezona)
import { useForm } from "react-hook-form";
import { email, regex, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
 
//zod campo a campo o que eu valido, e ql a mensagem que eu exibo , se der um erro


const schemaCadUsuario = z.object({
    //o que eu recebo
     nomeUsuario: z.string()
        .trim()
        .min(1,'Preencha o campo nome, por favor')
        .max(40, 'O campo permite até 30 caracteres')
        .regex(new RegExp(/^[^\\s][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/), 'Não aceitamos numeros e nem caracteres especiais'),

   
    emailUsuario: z.string()
        .trim()
        .min(1, 'Preencha o campo email, por favor')
        .max(50, 'O campo permite até 50 caracteres')
        .email('Insira um email válido')
        .regex(new RegExp(/^[^\\s][a-z0-9]+@[a-z0-9]+\.[c][o][m]+\.?$/i), "Formato inválido")
       
    });
 
// Crianção do componente
export function CadUsuario(){
   // 
    const {
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
            alert("Houve um erro durante o cadastro, qualquer problema chama o Paulo");
            console.error("Deu ruim hein", error)
            console.error("erro 1",error.response.data);    // ***
            console.error("erro 2",error.response.status);  // ***
            console.error("erro 3", error.response.headers);
        }
       
    }    
    return(
        //no momento da submissao chamo as funções 
        <form className="formulario"onSubmit={handleSubmit(obterDados)}>
            <h2>Cadastro de Usuário</h2>
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
            {errors?.nomeUsuario && <p id="erroInputNomeUsuario">{errors?.nomeUsuario.message}</p>}
 
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
    )
}