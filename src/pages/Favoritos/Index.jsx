import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css';

function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const favoritos = localStorage.getItem("@filmes");
        setFilmes(JSON.parse(favoritos)) || [];
    }, []);

    function excluirFilme(id){
        //Retorna todos os filmes com id diferente do selecionado
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);
        });

        setFilmes(filtroFilmes)

        localStorage.setItem('@filmes', JSON.stringify(filtroFilmes));
        toast.success('Filme removido com sucesso');
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possuí nenhum filme salvo</span>}
            <ul>
                {
                    filmes.map((item) => (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes...</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Favoritos;