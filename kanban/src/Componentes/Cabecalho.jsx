import { Link } from "react-router-dom"

export function Cabecalho(){
    return(
        <header className="conteiner">
            <section className="barraTexto">
                <h1 className="titulo">Gerenciamento de Tarefas</h1>
            </section>

            {/* links de cada página */}
            <nav className="barra">
                <ul>
                    <li><Link to ='/atualizarTarefas'>Editar tarefa</Link></li>
                    <li><Link to ='/cadUsuario'>Cadastro de Usuário </Link></li>
                    <li><Link to= '/cadTarefas'>Cadastro de Tarefas</Link></li>
                    <li><Link to='/'>Tarefas</Link></li>
                </ul>
            </nav>

        </header>
    )
}