export const fetchMovies = async (searchText, moviesCallback, errorCallback) => {
    try{
        const response = await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=1faa1d17&type=movie`);
        const data = await response.json();

        if (data.Response == 'True'){
            console.log(data.Search)
            moviesCallback(data.Search);
            errorCallback(null);
        }
        else{
            moviesCallback([])
            errorCallback(data.Error);
        }
    }
    catch (err) {
        errorCallback("An error occurred while fetching movie data.");
    }
}