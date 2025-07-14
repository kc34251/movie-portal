import { useState } from "react";
import { fetchMovies } from "../api/fetchMovies";
import ErrorAlert from "./ErrorAlert";
import MovieDetail from "./MovieDetail";

function MoviesPortal() {
    const [searchInputText, setSearchInputText] = useState('')
    const [enteredSearchText, setEnteredSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    const onSearchTextEnter = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchMovies(searchInputText, setMovies, setError, () => setEnteredSearchText(searchInputText), 1, setTotalPages)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchMovies(
            enteredSearchText,
            setMovies,
            setError,
            null,
            page,
            setTotalPages
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const maxVisible = 5;
        let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - maxVisible + 1, 1);
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        return (
            <ul className="pagination pagination-lg justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    &laquo;
                    </button>
                </li>

                {start > 1 && (
                    <>
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                    </li>
                    {start > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                    </>
                )}

                {pageNumbers.map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                    </li>
                ))}

                {end < totalPages && (
                    <>
                    {end < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                    </li>
                    </>
                )}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    &raquo;
                    </button>
                </li>
            </ul>
            );
        };
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
            <br/>
            {error && <ErrorAlert error={error} searchTerm={enteredSearchText}/>}
            {movies.length > 0 && <p className='text-light'>Showing {movies.length} Movies for "{enteredSearchText}"</p>}
             {movies.map((movie) => (
                <MovieDetail key={movie.imdbID} movie={movie} />
            ))}
            {movies.length > 0 && (
                <div className="mt-4">
                    {renderPagination()}
                </div>
                )}
        </>
    );
}

export default MoviesPortal;