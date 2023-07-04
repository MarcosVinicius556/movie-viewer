import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './home.css'

function Home() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: 'd0553b25a41d252c73c376f5daa1a19d',
          language: 'pt-BR',
          page: 1
        }
      });
      
      setFilmes(response.data.results.slice(0, 10));

    }
    loadFilmes();
    setLoading(false);
  }, []);

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="container">
        <div className="lista-filmes">
          {
            filmes.map((filme) => (
              <article key={filme.id}>
                <strong>{ filme.title }</strong>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={ filme.title } />
                <Link to={`/filme/${filme.id}`}>Detalhes</Link>
              </article>
            ))
          }
        </div>
    </div>
  )
}

export default Home;