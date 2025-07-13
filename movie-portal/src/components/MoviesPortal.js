import { useState } from "react";
import { fetchMovies } from "../api/fetchMovies";

function MoviesPortal() {
    const [searchInputText, setSearchInputText] = useState('')
    const [enteredSearchText, setEnteredSearchText] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    const onSearchTextEnter = (e) => {
        e.preventDefault();
        fetchMovies(searchInputText, setMovies, setError)
        setEnteredSearchText(searchInputText)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={onSearchTextEnter}>
                        <input
                            type="text" placeholder="Search Movie" className="form-control"
                            value={searchInputText}
                            onChange={(e) => setSearchInputText(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            {enteredSearchText}
            {JSON.stringify(movies)}
            {error}
        </>
    );
}

export default MoviesPortal;