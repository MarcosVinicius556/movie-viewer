import { useEffect, useState } from "react";
import api from "../../services/api";

function Home() {

  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: 'd0553b25a41d252c73c376f5daa1a19d',
          language: 'pt-BR',
          page: 1
        }
      });
      
      console.log(response);

    }
    loadFilmes();
  }, []);

  return (
    <div>
        <h1>Bem Vindo a Home</h1>
    </div>
  )
}

export default Home;