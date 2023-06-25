//BASE URL https://api.themoviedb.org/3/
/*
 * URL para buscar os filmes que estão em cartaz:
 * movie/now_playing?api_key=d0553b25a41d252c73c376f5daa1a19d&language=pt-BR
 */

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;