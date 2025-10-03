import { Routes, Route } from 'react-router-dom'; // Importando Routes e Route
import  CadTarefas  from '../Paginas/CadTarefas';
import AtualizarTarefa from '../Paginas/AtualizarTarefa';
import CadUsuario from '../Paginas/CadUsuario'; // Certifique-se de que o caminho esteja correto
import Quadro from '../Componentes/Quadro';         // Certifique-se de que o caminho esteja correto

export function Rotas() {
    return (
        <Routes>
            <Route path="/cadUsuario" element={<CadUsuario />} />
            <Route path="/cadTarefas" element={<CadTarefas />} />    
            <Route path="/" element={<Quadro />} />    
            <Route path="/atualizarTarefas" element={<AtualizarTarefa />} />
        </Routes>
    );
}

