document.body.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        document.getElementById("submit").click();
    }
})
document.getElementById("submit").addEventListener("click", async () => {
    let movie_name = document.getElementById("movie-name").value;
    if (movie_name.trim().length > 0) {
        let movie_obj = await getMovie(movie_name);
        let output = document.getElementById("info");
        if (movie_obj.Response == "True") {
            let element = `
                    <p id="name"> Name: ${movie_obj.Title}</p>
                    <p id="year"> Year: ${movie_obj.Year}</p>
                    <p id="director"> Director: ${movie_obj.Director}</p>
                    <p id="released"> Released: ${movie_obj.Released}</p>
                    <p id="runtime"> Runtime: ${movie_obj.Runtime}</p>
            `
            output.innerHTML = element;
        }
        else {
            output.innerHTML = movie_obj.Error;
        }
    }
});
let getMovie = (movie_name) => {
    let promise = fetch(`http://www.omdbapi.com/?t=${movie_name}&apikey=9c7d8a7c`)
        .then((r) => {return r.json()})
        .then((data) => {return data})
        .catch((error) => {console.log(error)});
    return promise
}

