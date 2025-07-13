import { useState } from "react";

function MoviesPortal() {
    const {searchInputText, setSearchInputText} =   useState('')
    const {enteredSearchText, setEnteredSearchText} = useState('')

    const onSearchTextEnter = (e) => {
        e.preventDefault();
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
        </>
    );
}

export default MoviesPortal;