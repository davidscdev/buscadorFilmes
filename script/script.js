// api_key=c0c5fe318f67b8420d23fc5a0baa3718   --> Código de acesso oa TDBM

//Constantes de acesso ao tmdb.
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c0c5fe318f67b8420d23fc5a0baa3718&language=pt-BR';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=c0c5fe318f67b8420d23fc5a0baa3718&query="';
const LINGUAGE_API = '&language=pt-BR';


// Seleção de elementos para construção/manipulação do HTML.
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

//Pega a lista inicial de filmes
getMovies(API_URL);

//Função para buscar os filmes na API
async function getMovies(url) {
    const res = await fetch(url); //Percorre o conteúdo disponibilizado pela API 
    const data = await res.json(); // gera um Json com os dados.

    //Chama a função pra exibir o conteúdo em tela.
    showMovies(data.results);
}


//Função para exibir os filmes em tela.
function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie; //Descontruindo o array de filmes.

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `;

        main.appendChild(movieEl);

    });
}


//Estiliza a nota de acordo com a média
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


//Funcionalidade do item de pesquisa 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm + LINGUAGE_API);
        search.value = '';
    } else {
        window.location.reload();
    }
});