document.addEventListener("DOMContentLoaded", init);

let sourceElement = "";

function init(){
    document.addEventListener("click",navigate);
    document.querySelector("input[type='submit'][data-target='movie-selection']").addEventListener("click",fetchdata);
    document.querySelector("#form-submit").addEventListener("click",ticketOverview);
    document.querySelector("#anotherPurchase").addEventListener("click",ticketOverviewStart);

    document.addEventListener("dragstart",onDragStart);
    document.querySelector("#target").addEventListener("dragover",onDragOver);
    document.querySelector("#target").addEventListener("drop",onDrop);

}

function navigate(e){
    e.preventDefault();
    if (e.target.getAttribute("data-target") === null) return;
    let $nextPage = e.target.getAttribute("data-target");
    let $currentPage = e.target.closest("div").getAttribute('id');

    document.querySelector("#"+$nextPage).classList.remove("hidden");
    document.querySelector("#"+$currentPage).classList.add("hidden");
}


function fetchdata() {
    const filmValue = document.querySelector("#filmnaam").value;
    const URL = `https://www.omdbapi.com/?s=${filmValue}&apikey=2d348e48`;
    fetch(URL)
        .then(res => res.json())
        .then(data => loadMovies(data.Search))
        .catch(error => console.error('Er is een fout opgetreden:', error));
}


function loadMovies(films){
    const $movies = document.querySelector("#films");
    $movies.innerHTML ="";
    films.forEach(film => displayMovie(film, $movies));
}

function displayMovie(film, div){
    div.insertAdjacentHTML("beforeend",`<img id="img" src="${film.Poster}" draggable="true" alt="${film.Title}">`)
}

function ticketOverview(){
    const div = document.querySelector("#finishPurchase");
    const h2 = "Bedankt voor je aankoop!";
    displayFinishOverview(div, h2);
}

function ticketOverviewStart(){
    const div = document.querySelector("#finishPurchaseStart");
    const h2 = "Your previous purchase:"
    displayFinishOverview(div, h2);
}

function displayFinishOverview(div, h2){
    const snack = document.querySelector("#dropdown").value;
    const tickets = document.querySelector("#tickets").value;
    const naam = document.querySelector("#naam").value;
    const email = document.querySelector("#email").value;
    const img = sourceElement;
    div.innerHTML="";
    div.insertAdjacentHTML("beforeend",`<h2>${h2}</h2>
                                                   <img src="${img.src}" alt="${img.alt}">
                                                   <ul>
                                                       <li>Your name: ${naam}</li>
                                                       <li>Your email address: ${email}</li>
                                                       <li>Complimentary snack: ${snack}</li>
                                                       <li>Tickets: ${tickets}</li>
                                                   </ul>`)

}