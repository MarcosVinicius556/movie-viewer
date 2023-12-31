import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './filme.css';

function Filme() {

  const { id } = useParams();
  const [filme, setFilme] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    async function loadFilme(){
        await api.get(`movie/${id}`, {
          params: { //Parâmetros exigidos pela API
            api_key: 'd0553b25a41d252c73c376f5daa1a19d',
            language: 'pt-BR'
          }
        }).then((response) => {
          setFilme(response.data);
          setLoading(false);
        }).catch(() => {
          navigation("/", { replace: true });
          return; //Para a execução do componente
        });
      }

      loadFilme();

      return () => {
        //Encerra o componente
      }
      //Tudo o que é dependecia fora do useEffect, deve ser passado para "observar"
    }, [id, navigation]); 

    function salvarFilme(){
      const minhaLista = localStorage.getItem('@filmes');

      let favoritos = JSON.parse(minhaLista) || [];

      //Verifica se dentro da lista, possui algum que se encaixa na condição
      const hasFilme = favoritos.some(filmeSalvo => filmeSalvo.id === filme.id); 
      if(hasFilme) {
        toast.warn('Filme já está na lista');
        return;
      }

      favoritos.push(filme);

      localStorage.setItem("@filmes", JSON.stringify(favoritos));
      toast.success('Filme salvo com sucesso');
    }

    if(loading){
      return(
        <div className="filme-info">
          <h1>Carregando detalhes...</h1>
        </div>
      );
    }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={ filme.title } />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a rel="external" target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filme;