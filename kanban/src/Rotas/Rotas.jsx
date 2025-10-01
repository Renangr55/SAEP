import {Routes, Route} from 'react-router-dom';
import { CadUsuario } from '../Paginas/CadUsuario'; 
import { Quadro } from '../Componentes/Quadro';
import { Inicial } from '../Paginas/Inicial';
import {CadTarefas } from '../Paginas/CadTarefas';
import { Tarefa } from '../Componentes/Tarefa';
import AtualizarTarefa from '../Paginas/AtualizarTarefa';


export function Rotas(){
    return(
        <>
            <Routes>
                <Route path='/' element={<Inicial/>}>
                    <Route path='cadUsuario' element={<CadUsuario/>}/>
                    <Route path='cadTarefas' element={<CadTarefas/>}/>    
                    <Route path='quadros' element={<Quadro/>}/>    
                    <Route path='atualizarTarefas' element={<AtualizarTarefa />} />
                </Route>
            </Routes>
        </>
    )
}