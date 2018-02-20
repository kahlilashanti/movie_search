$(document).ready(() => {
 // alert(1);
 $('#searchForm').on('submit', (e) => {
   // console.log($('#searchText').val());
   let searchText = $('#searchText').val();
   getMovies(searchText);
   e.preventDefault();
 })
});

function getMovies(searchText){
  //test it first as follows:
  // console.log(searchText);

  //make request to the API
  axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=72544ae8')
  .then((response) => {
    console.log(response);
    let movies = response.data.Search;
    let output = '';
    $.each(movies, (index, movie)=>{
      output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onClick = "movieSelected(${'movie.imdbID'})" class="btn btn-primary" href="movie.html" target="_blank">More Info</a>
          </div>
        </div>
      `;
    });
    $('#movies').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=72544ae8')
  .then((response) => {
    console.log(response);
    let movie= response.data;

    let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
         <h2>${movie.Title}</h2>
           <ul class="list-group">
            <li class="list-group-item">Genre: ${movie.Genre}</li>
            <li class="list-group-item">Released: ${movie.Released}</li>
            <li class="list-group-item">Rated: ${movie.Rated}</li>
            <li class="list-group-item">IMDB Rating: ${movie.imdbRating}</li>
            <li class="list-group-item">Director: ${movie.Director}</li>
            <li class="list-group-item">Writer: ${movie.Writer}</li>
            <li class="list-group-item">Actors: ${movie.Actors}</li>
           </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-info">Go Back To Search</a>
        </div>
      </div>
    `;

    $('#movie').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });
}
